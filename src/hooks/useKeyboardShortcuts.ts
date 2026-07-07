import { useEffect } from 'react';
import { useAppStore } from '@/store/app.store';

export function useKeyboardShortcuts() {
  const { openCmd, closeAll } = useAppStore();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openCmd();
      }
      if (e.key === 'Escape') {
        closeAll();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [openCmd, closeAll]);
}