'use client';
import { Topbar }  from './Topbar';
import { Sidebar } from './Sidebar';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export function AppShell({ children }: { children: React.ReactNode }) {
  useKeyboardShortcuts();
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '240px 1fr',
      gridTemplateRows: '52px 1fr',
      height: '100vh',
      overflow: 'hidden',
    }}>
      <Topbar />
      <Sidebar />
      <main style={{ overflow: 'auto', background: 'var(--bg0)' }}>
        {children}
      </main>
    </div>
  );
}