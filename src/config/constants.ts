export const APP_NAME   = 'ContextIQ';
export const APP_URL    = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const PLANS = {
  starter:    { name: 'Starter',    price: 0,  seats: 1,  hours: 10 },
  pro:        { name: 'Pro Team',   price: 49, seats: 10, hours: 100 },
  enterprise: { name: 'Enterprise', price: -1, seats: -1, hours: -1 },
} as const;

export const MEETING_TYPES = [
  { value: 'SALES',    label: 'Sales Call',       icon: '💼', color: 'blue' },
  { value: 'CUSTOMER', label: 'Customer Success', icon: '🤝', color: 'green' },
  { value: 'INTERNAL', label: 'Internal',         icon: '👥', color: 'purple' },
  { value: 'INVESTOR', label: 'Investor',         icon: '💰', color: 'orange' },
  { value: 'DEMO',     label: 'Product Demo',     icon: '🎯', color: 'cyan' },
] as const;

export const INSIGHT_TYPES = {
  RISK:        { label: '🚨 Risk',         color: 'var(--red)',    cls: 'risk' },
  OPPORTUNITY: { label: '💡 Opportunity',  color: 'var(--green)',  cls: 'opp' },
  PATTERN:     { label: '📈 Pattern',      color: 'var(--blue)',   cls: 'pattern' },
  DRIFT_ALERT: { label: '⚠️ Drift Alert',  color: 'var(--orange)', cls: 'alert' },
  WIN_PATTERN: { label: '🏆 Win Pattern',  color: 'var(--purple)', cls: 'win' },
  COMMITMENT:  { label: '⚡ Commitment',   color: 'var(--cyan)',   cls: 'commitment' },
} as const;

export const AI_PROMPTS = {
  SYSTEM_ANALYST: `You are ContextIQ's AI analysis engine.
Extract structured business intelligence from meeting transcripts.
Be specific, actionable, and data-driven.`,

  SYSTEM_ASSISTANT: `You are the AI Chief of Staff.
You have full context of all meetings, deals, and team activities.
Be direct, reference real data, and provide actionable recommendations.`,
} as const;