'use client';
import { useAppStore } from '@/store/app.store';

export function Topbar() {
  const { openCmd, toggleNotif, toggleProfile } = useAppStore();
  return (
    <header style={{
      gridColumn: '1/-1',
      display: 'flex', alignItems: 'center', padding: '0 18px', gap: '14px',
      background: 'rgba(2,4,8,.92)', backdropFilter: 'blur(24px)',
      borderBottom: '1px solid var(--border1)', zIndex: 200,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
        <div style={{
          width: '30px', height: '30px', background: 'var(--g1)',
          borderRadius: '9px', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '15px',
          boxShadow: '0 0 20px rgba(59,130,246,.3)',
        }}>⚡</div>
        <span style={{
          fontWeight: 900, fontSize: '17px',
          background: 'var(--g1)', WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>ContextIQ</span>
      </div>

      <div style={{ flex: 1, maxWidth: '420px', position: 'relative' }}>
        <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px' }}>🔍</span>
        <input
          readOnly onClick={openCmd}
          placeholder="Search everything... (⌘K)"
          style={{
            width: '100%', background: 'var(--bg3)', border: '1px solid var(--border1)',
            borderRadius: '10px', padding: '7px 14px 7px 38px',
            color: 'var(--t0)', fontSize: '13px', cursor: 'pointer',
          }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto' }}>
        {[
          { ico: '➕', title: 'New Meeting' },
          { ico: '🔔', title: 'Notifications', onClick: toggleNotif },
          { ico: '⚙️', title: 'Settings' },
        ].map((btn) => (
          <div key={btn.ico}
            onClick={btn.onClick}
            title={btn.title}
            style={{
              width: '34px', height: '34px', borderRadius: '7px',
              border: '1px solid var(--border1)', background: 'var(--bg3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: '15px', color: 'var(--t2)',
            }}>
            {btn.ico}
          </div>
        ))}
        <div
          onClick={toggleProfile}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '4px 10px 4px 4px', borderRadius: '99px',
            border: '1px solid var(--border1)', background: 'var(--bg3)',
            cursor: 'pointer',
          }}>
          <div style={{
            width: '26px', height: '26px', borderRadius: '50%',
            background: 'var(--g1)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontWeight: 800, fontSize: '11px',
          }}>S</div>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--t1)' }}>Sarah Chen</span>
        </div>
      </div>
    </header>
  );
}