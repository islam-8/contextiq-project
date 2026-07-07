import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');

  const user = await db.user.findUnique({ where: { email: session.user.email! } });
  if (!user?.workspaceId) return NextResponse.json({ insights: [] });

  const where: any = { workspaceId: user.workspaceId, resolved: false };
  if (type) where.type = type;

  const insights = await db.insight.findMany({
    where, orderBy: [{ severity: 'desc' }, { createdAt: 'desc' }], take: 50,
  });
  return NextResponse.json({ insights });
}