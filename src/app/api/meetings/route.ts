import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { z } from 'zod';

const createSchema = z.object({
  title: z.string().min(1),
  type: z.enum(['SALES','CUSTOMER','INTERNAL','INVESTOR','DEMO']).default('INTERNAL'),
  participants: z.array(z.string()).default([]),
  linkedAccount: z.string().optional(),
  scheduledAt: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const limit  = parseInt(searchParams.get('limit') || '20');
  const page   = parseInt(searchParams.get('page') || '1');

  const user = await db.user.findUnique({ where: { email: session.user.email! } });
  if (!user?.workspaceId) return NextResponse.json({ meetings: [] });

  const where: any = { workspaceId: user.workspaceId };
  if (status) where.status = status;

  const [meetings, total] = await Promise.all([
    db.meeting.findMany({
      where, orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit, take: limit,
      include: {
        _count: { select: { actions: true, insights: true } },
        summary: { select: { content: true } },
      },
    }),
    db.meeting.count({ where }),
  ]);

  return NextResponse.json({ meetings, total, page, limit });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const data = createSchema.parse(body);

  const user = await db.user.findUnique({ where: { email: session.user.email! } });
  if (!user?.workspaceId) return NextResponse.json({ error: 'No workspace' }, { status: 400 });

  const meeting = await db.meeting.create({
    data: {
      ...data,
      userId: user.id,
      workspaceId: user.workspaceId,
      status: 'SCHEDULED',
    },
  });
  return NextResponse.json({ meeting }, { status: 201 });
}