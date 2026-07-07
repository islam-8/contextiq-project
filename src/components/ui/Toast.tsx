'use client';
import { useUIStore } from '@/store/ui.store';

const icons = { success:'✅', error:'❌', warning:'⚠️', info:'ℹ️' };
const colors = {
  success: 'border-green-500/30',
  error:   'border-red-500/30',
  warning: 'border-orange-500/30',
  info:    'border-blue-500/30',
};

export function ToastStack() {
  const { toasts, removeToast } = useUIStore();
  return (
    <div style={{ position:'fixed', top:'62px', right:'18px', zIndex:9999, display:'flex', flexDirection:'column', gap:'8px' }}>
      {toasts.map((t) => (
        <div key={t.id}
          onClick={() => removeToast(t.id)}
          style={{
            background:'var(--bg2)', border:`1px solid`, borderRadius:'12px',
            padding:'11px 16px', fontSize:'12.5px', fontWeight:600, color:'var(--t0)',
            display:'flex', alignItems:'center', gap:'9px',
            boxShadow:'0 8px 32px rgba(0,0,0,.4)', cursor:'pointer',
            minWidth:'280px', maxWidth:'340px',
            animation:'slideIn .3s ease',
          }}>
          <span>{icons[t.type]}</span>
          <span style={{ flex:1 }}>{t.message}</span>
        </div>
      ))}
    </div>
  );
}