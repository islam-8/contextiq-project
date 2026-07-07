'use client';
import { ToastStack } from '@/components/ui/Toast';

export function DashboardView() {
  return (
    <div style={{ padding: '22px' }}>
      <ToastStack />
      <div style={{ marginBottom: '22px' }}>
        <h1 style={{ fontSize: '21px', fontWeight: 900, letterSpacing: '-.4px' }}>
          Good morning, Sarah 👋
        </h1>
        <p style={{ fontSize: '12.5px', color: 'var(--t2)', marginTop: '3px' }}>
          3 meetings today · 7 action items pending · 2 new risk signals detected
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px', marginBottom: '18px' }}>
        {[
          { label: 'Meetings This Month', val: '47',  delta: '↑ 18%', color: 'var(--blue)',   icon: '🎙️' },
          { label: 'Actions Generated',   val: '183', delta: '89% done', color: 'var(--purple)', icon: '⚡' },
          { label: 'Knowledge Nodes',     val: '1.2K',delta: '↑ 340 new', color: 'var(--green)', icon: '🧠' },
          { label: 'Hours Saved',         val: '31h', delta: 'this month', color: 'var(--orange)', icon: '⏱️' },
        ].map((s) => (
          <div key={s.label} style={{
            background: 'var(--bg2)', border: '1px solid var(--border1)',
            borderRadius: '16px', padding: '16px 18px', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: '0', left: '0', right: '0', height: '2px', background: s.color }} />
            <div style={{ position: 'absolute', top: '14px', right: '16px', fontSize: '22px', opacity: .1 }}>{s.icon}</div>
            <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--t3)', marginBottom: '8px' }}>{s.label}</div>
            <div style={{ fontSize: '26px', fontWeight: 900, color: 'var(--t0)', fontFamily: 'JetBrains Mono,monospace', marginBottom: '6px' }}>{s.val}</div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--green)' }}>{s.delta}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border1)', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
        <div style={{ fontSize: '32px', marginBottom: '12px' }}>🎙️</div>
        <div style={{ fontSize: '16px', fontWeight: 800, marginBottom: '6px' }}>Start Recording a Meeting</div>
        <div style={{ fontSize: '13px', color: 'var(--t3)', marginBottom: '16px' }}>
          AI will transcribe and extract insights in real-time
        </div>
        <a href="/meetings" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '10px 24px', borderRadius: '10px',
          background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
          color: '#fff', fontSize: '13px', fontWeight: 700,
          textDecoration: 'none',
        }}>🎙️ Go to Meetings</a>
      </div>
    </div>
  );
}