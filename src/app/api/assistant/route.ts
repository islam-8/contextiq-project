import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { streamChat } from '@/lib/openai';
import { db } from '@/lib/db';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { messages } = await req.json();

  const user = await db.user.findUnique({
    where: { email: session.user.email! },
    include: { workspace: true },
  });

  const context = user?.workspace
    ? `Workspace: ${user.workspace.name}. Plan: ${user.workspace.plan}.`
    : 'ContextIQ workspace.';

  const encoder = new TextEncoder();
  const stream  = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of streamChat(messages, context)) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ chunk })}\n\n`));
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      } catch (err) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: String(err) })}\n\n`));
      } finally {
        controller.close();
      }
    },
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}