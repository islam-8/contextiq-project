export type UserRole = 'OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER';
export type Plan     = 'STARTER' | 'PRO' | 'ENTERPRISE';

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: UserRole;
  workspaceId?: string;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  plan: Plan;
  hoursLimit: number;
  hoursUsed: number;
}