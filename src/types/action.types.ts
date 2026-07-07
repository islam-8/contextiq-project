export type Priority    = 'Low' | 'Med' | 'High' | 'Urgent';
export type ActionStatus = 'PENDING' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED';

export interface ActionItem {
  id: string;
  text: string;
  priority: Priority;
  status: ActionStatus;
  assignee?: string;
  dueDate?: string;
  meeting?: string;
  overdue?: boolean;
  done?: boolean;
}