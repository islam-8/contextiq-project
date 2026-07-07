export const NAV_ITEMS = [
  {
    section: 'Workspace',
    items: [
      { id: 'dashboard',    label: 'Dashboard',       icon: '📊' },
      { id: 'meetings',     label: 'Meetings',        icon: '🎙️', badge: '12' },
      { id: 'intelligence', label: 'Intelligence',    icon: '🧠', badge: 'New', badgeColor: 'green' },
      { id: 'actions',      label: 'Action Items',    icon: '✅', badge: '7',   badgeColor: 'orange' },
    ],
  },
  {
    section: 'AI Tools',
    items: [
      { id: 'assistant',    label: 'AI Chief of Staff', icon: '🤖' },
      { id: 'graph',        label: 'Knowledge Graph',   icon: '🕸️' },
      { id: 'analytics',    label: 'Analytics',         icon: '📈' },
    ],
  },
  {
    section: 'Team & Data',
    items: [
      { id: 'crm',          label: 'CRM Intelligence', icon: '👥' },
      { id: 'integrations', label: 'Integrations',     icon: '🔗' },
      { id: 'settings',     label: 'Settings',         icon: '⚙️' },
    ],
  },
] as const;