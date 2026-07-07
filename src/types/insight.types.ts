export type InsightType =
  | 'RISK' | 'OPPORTUNITY' | 'PATTERN'
  | 'DRIFT_ALERT' | 'WIN_PATTERN' | 'COMMITMENT';

export interface Insight {
  id: string;
  type: InsightType;
  title: string;
  body: string;
  severity: number;
  resolved: boolean;
  meetingId?: string;
  createdAt: string;
}