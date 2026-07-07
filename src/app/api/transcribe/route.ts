import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { transcribeAudio, analyzeMeeting } from '@/lib/openai';
import { db } from '@/lib/db';

export const runtime = 'nodejs';
export const maxDuration = 120;

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const formData    = await req.formData();
    const audioFile   = formData.get('audio') as File;
    const meetingId   = formData.get('meetingId') as string;
    const meetingType = (formData.get('type') as string) || 'INTERNAL';
    const participants = JSON.parse((formData.get('participants') as string) || '[]');
    const linkedAccount = formData.get('linkedAccount') as string | undefined;

    if (!audioFile || !meetingId)
      return NextResponse.json({ error: 'Missing audio or meetingId' }, { status: 400 });

    const buffer = Buffer.from(await audioFile.arrayBuffer());
    const { text, segments } = await transcribeAudio(buffer, `${meetingId}.webm`);

    await db.transcript.upsert({
      where: { meetingId },
      create: { meetingId, rawText: text, segments: segments as any },
      update: { rawText: text, segments: segments as any },
    });

    const analysis = await analyzeMeeting({ transcript: text, meetingType, participants, linkedAccount });

    await db.summary.upsert({
      where: { meetingId },
      create: {
        meetingId,
        content: analysis.summary || '',
        keyPoints: analysis.keyPoints || [],
        decisions: analysis.decisions || [],
        commitments: analysis.commitments || [],
      },
      update: { content: analysis.summary || '' },
    });

    const user = await db.user.findUnique({ where: { email: session.user.email! } });

    if (analysis.actionItems?.length && user) {
      await db.actionItem.createMany({
        data: analysis.actionItems.map((a: any) => ({
          text: a.text,
          priority: a.priority === 'High' ? 'HIGH' : a.priority === 'Med' ? 'MEDIUM' : 'LOW',
          meetingId,
          assigneeId: user.id,
        })),
        skipDuplicates: true,
      });
    }

    if (analysis.insights?.length && user?.workspaceId) {
      await db.insight.createMany({
        data: analysis.insights.map((i: any) => ({
          type: i.type || 'PATTERN',
          title: i.title || 'Insight',
          body: i.body || '',
          severity: i.severity || 5,
          meetingId,
          workspaceId: user.workspaceId!,
        })),
        skipDuplicates: true,
      });
    }

    await db.meeting.update({
      where: { id: meetingId },
      data: {
        status: 'COMPLETED',
        endedAt: new Date(),
        score: analysis.sentiment?.overall,
      },
    });

    return NextResponse.json({
      success: true,
      meetingId,
      actionsCount: analysis.actionItems?.length || 0,
      insightsCount: analysis.insights?.length || 0,
    });
  } catch (error) {
    console.error('[TRANSCRIBE]', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}