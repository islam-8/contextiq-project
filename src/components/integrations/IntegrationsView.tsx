'use client';
export function IntegrationsView() {
  const integrations = [
    { name:'Salesforce', icon:'☁️', desc:'Auto-sync deals and contacts', connected:false },
    { name:'Slack', icon:'💬', desc:'Send meeting summaries to channels', connected:false },
    { name:'Notion', icon:'📝', desc:'Export meeting notes', connected:false },
    { name:'HubSpot', icon:'🧡', desc:'CRM sync and pipeline', connected:false },
    { name:'Zoom', icon:'🎥', desc:'Record Zoom calls', connected:false },
    { name:'Google Calendar', icon:'📅', desc:'Auto-join meetings', connected:false },
  ];
  return (
    <div style={{ padding: '22px' }}>
      <h1 style={{ fontSize: '21px', fontWeight: 900, marginBottom: '8px' }}>🔗 Integrations</h1>
      <p style={{ fontSize: '12.5px', color: 'var(--t2)', marginBottom: '22px' }}>Connect ContextIQ to your tools</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' }}>
        {integrations.map((i) => (
          <div key={i.name} style={{ background: 'var(--bg2)', border: '1px solid var(--border1)', borderRadius: '16px', padding: '18px' }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>{i.icon}</div>
            <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '4px' }}>{i.name}</div>
            <div style={{ fontSize: '12px', color: 'var(--t3)', marginBottom: '12px' }}>{i.desc}</div>
            <button style={{ background: 'var(--g1)', border: 'none', borderRadius: '8px', padding: '7px 14px', color: '#fff', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
              Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}