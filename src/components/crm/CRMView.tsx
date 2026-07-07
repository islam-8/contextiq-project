'use client';
export function CRMView() {
  return (
    <div style={{ padding: '22px' }}>
      <h1 style={{ fontSize: '21px', fontWeight: 900, marginBottom: '8px' }}>👥 CRM Intelligence</h1>
      <p style={{ fontSize: '12.5px', color: 'var(--t2)', marginBottom: '22px' }}>
        Auto-enriched accounts with meeting data
      </p>
      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border1)', borderRadius: '16px', padding: '24px', textAlign: 'center', color: 'var(--t3)' }}>
        👥 Connect your CRM to see intelligent account data
      </div>
    </div>
  );
}