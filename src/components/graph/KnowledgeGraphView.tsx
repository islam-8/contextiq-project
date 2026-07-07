'use client';
export function KnowledgeGraphView() {
  return (
    <div style={{ padding: '22px' }}>
      <h1 style={{ fontSize: '21px', fontWeight: 900, marginBottom: '8px' }}>🕸️ Knowledge Graph</h1>
      <p style={{ fontSize: '12.5px', color: 'var(--t2)', marginBottom: '22px' }}>
        Living intelligence extracted from your meetings
      </p>
      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border1)', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>🕸️</div>
        <div style={{ fontSize: '14px', color: 'var(--t3)' }}>
          Knowledge graph builds automatically as you record meetings
        </div>
      </div>
    </div>
  );
}