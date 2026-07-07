export type MeetingStatus = 'SCHEDULED' | 'LIVE' | 'PROCESSING' | 'COMPLETED' | 'ARCHIVED';
export type MeetingType   = 'SALES' | 'CUSTOMER' | 'INTERNAL' | 'INVESTOR' | 'DEMO';

export interface Meeting {
  id: string;
  title: string;
  type: MeetingType;
  status: MeetingStatus;
  date: string;
  duration: string;
  participants: string[];
  linkedAccount?: string;
  actions: number;
  insights: number;
  score?: number;
  audioUrl?: string;
}

export interface TranscriptSegment {
  id: number;
  start: number;
  end: number;
  text: string;
  speaker: string;
}

export interface MeetingAnalysis {
  summary: string;
  keyPoints: string[];
  decisions: string[];
  commitments: Array<{ who: string; what: string; by: string }>;
  actionItems: Array<{
    text: string;
    assignee: string;
    dueDate: string;
    priority: 'High' | 'Med' | 'Low';
  }>;
  insights: Array<{
    type: string;
    title: string;
    body: string;
    severity: number;
  }>;
  sentiment: { overall: number; trend: string };
}