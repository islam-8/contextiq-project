'use client';
import { useState } from 'react';

const sections = ['👤 Profile','🧠 AI Config','💳 Billing','👥 Team','🔒 Security','🔌 API'];

export function SettingsView() {
  const [active, setActive] = useState(0);
  return (
    <div style={{ padding: '22px' }}>
      <h1 style={{ fontSize: '21px', fontWeight: 900, marginBottom: '22px' }}>⚙️ Settings</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '14px' }}>
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border1)', borderRadius: '16px', padding: '10px' }}>
          {sections.map((s, i) => (
            <div key={s} onClick={() => setActive(i)}
              style={{ padding: '8px 12px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer', marginBottom: '2px', color: active === i ? 'var(--blue)' : 'var(--t3)', background: active === i ? 'rgba(59,130,246,.08)' : 'transparent' }}>
              {s}
            </div>
          ))}
        </div>
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border1)', borderRadius: '16px', padding: '20px' }}>
          <div style={{ fontSize: '15px', fontWeight: 900, marginBottom: '18px' }}>{sections[active]}</div>
          <div style={{ color: 'var(--t3)', fontSize: '13px' }}>Settings panel for {sections[active]}</div>
        </div>
      </div>
    </div>
  );
}