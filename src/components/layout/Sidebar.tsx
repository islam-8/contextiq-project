'use client';
import { useRouter, usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/config/navigation';

export function Sidebar() {
  const router   = useRouter();
  const pathname = usePathname();

  return (
    <aside style={{
      background: 'var(--bg1)', borderRight: '1px solid var(--border0)',
      overflowY: 'auto', display: 'flex', flexDirection: 'column', padding: '10px 0 16px',
    }}>
      {NAV_ITEMS.map((section) => (
        <div key={section.section} style={{ marginBottom: '4px' }}>
          <div style={{
            fontSize: '9.5px', fontWeight: 700, letterSpacing: '.12em',
            textTransform: 'uppercase', color: 'var(--t4)', padding: '12px 16px 5px',
          }}>{section.section}</div>

          {section.items.map((item) => {
            const isActive = pathname === `/${item.id}` || pathname.startsWith(`/${item.id}/`);
            return (
              <div key={item.id}
                onClick={() => router.push(`/${item.id}`)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '9px',
                  padding: '8px 14px', cursor: 'pointer',
                  transition: 'all .15s',
                  color: isActive ? 'var(--blue)' : 'var(--t3)',
                  background: isActive ? 'rgba(59,130,246,.08)' : 'transparent',
                  borderLeft: isActive ? '2.5px solid var(--blue)' : '2.5px solid transparent',
                  fontSize: '12.5px', fontWeight: 500,
                }}>
                <span style={{ fontSize: '15px', width: '18px', textAlign: 'center' }}>{item.icon}</span>
                {item.label}
                {'badge' in item && item.badge && (
                  <span style={{
                    marginLeft: 'auto', fontSize: '9.5px', fontWeight: 800,
                    padding: '1px 7px', borderRadius: '99px',
                    background: ('badgeColor' in item && item.badgeColor) === 'green' ? 'var(--green)'
                               : ('badgeColor' in item && item.badgeColor) === 'orange' ? 'var(--orange)' : 'var(--blue)',
                    color: ('badgeColor' in item && item.badgeColor) === 'orange' ? '#000' : '#fff',
                  }}>{item.badge}</span>
                )}
              </div>
            );
          })}
        </div>
      ))}

      <div style={{ margin: 'auto 12px 0', background: 'var(--bg2)', border: '1px solid var(--border1)', borderRadius: '10px', padding: '12px' }}>
        <div style={{ fontSize: '11px', fontWeight: 800, background: 'var(--g1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '6px' }}>⚡ Pro Team</div>
        <div style={{ height: '4px', background: 'var(--border1)', borderRadius: '99px', overflow: 'hidden', margin: '6px 0' }}>
          <div style={{ height: '100%', width: '63%', background: 'var(--g1)', borderRadius: '99px' }}></div>
        </div>
        <div style={{ fontSize: '10px', color: 'var(--t3)' }}>63/100h · Renews Dec 1</div>
      </div>
    </aside>
  );
}