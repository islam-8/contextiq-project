import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function transcribeAudio(buffer: Buffer, filename: string) {
  const file = new File([buffer], filename, { type: 'audio/webm' });
  const response = await openai.audio.transcriptions.create({
    file,
    model: 'whisper-1',
    response_format: 'verbose_json',
    timestamp_granularities: ['segment'],
  });
  return {
    text: response.text,
    segments: (response.segments || []).map((s: any, i: number) => ({
      id: i,
      start: s.start,
      end: s.end,
      text: s.text.trim(),
      speaker: 'Speaker ' + ((i % 3) + 1),
    })),
  };
}

export async function analyzeMeeting(params: {
  transcript: string;
  meetingType: string;
  participants: string[];
  linkedAccount?: string;
}) {
  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'You are ContextIQ AI. Extract structured intelligence from meeting transcripts. Return valid JSON only.',
      },
      {
        role: 'user',
        content: `Analyze this ${params.meetingType} meeting.
Participants: ${params.participants.join(', ')}
${params.linkedAccount ? `Account: ${params.linkedAccount}` : ''}

TRANSCRIPT:
${params.transcript}

Return JSON with: summary, keyPoints[], decisions[], commitments[],
actionItems[{text,assignee,dueDate,priority}],
insights[{type,title,body,severity}],
entities{companies[],people[],topics[],risks[]},
sentiment{overall,trend}`,
      },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.3,
    max_tokens: 3000,
  });
  return JSON.parse(response.choices[0].message.content || '{}');
}

export async function* streamChat(messages: any[], context: string) {
  const stream = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o',
    messages: [
      { role: 'system', content: `You are an AI Chief of Staff. Context: ${context}` },
      ...messages,
    ],
    stream: true,
    temperature: 0.7,
    max_tokens: 1500,
  });
  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content;
    if (delta) yield delta;
  }
}

export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });
  return response.data[0].embedding;
}