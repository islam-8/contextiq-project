import { useUIStore } from '@/store/ui.store';

export function useToast() {
  const addToast = useUIStore((s) => s.addToast);
  return {
    toast: (message: string, type?: 'success' | 'error' | 'warning' | 'info') =>
      addToast(message, type),
  };
}