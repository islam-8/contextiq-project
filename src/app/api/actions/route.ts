import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = await db.user.findUnique({
    where: { email: session.user.email! },
    include: { workspace: true },
  });
  if (!user?.workspaceId) return NextResponse.json({ actions: [] });

  const meetingIds = await db.meeting
    .findMany({ where: { workspaceId: user.workspaceId }, select: { id: true } })
    .then((ms) => ms.map((m) => m.id));

  const actions = await db.actionItem.findMany({
    where: { meetingId: { in: meetingIds } },
    orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
    include: { meeting: { select: { title: true } }, assignee: { select: { name: true } } },
  });
  return NextResponse.json({ actions });
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id, status } = await req.json();
  const action = await db.actionItem.update({
    where: { id },
    data: { status, completedAt: status === 'DONE' ? new Date() : null },
  });
  return NextResponse.json({ action });
}