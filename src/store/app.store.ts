import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AppStore {
  currentView: string;
  sidebarOpen: boolean;
  cmdOpen: boolean;
  notifOpen: boolean;
  profileOpen: boolean;
  setView: (view: string) => void;
  toggleSidebar: () => void;
  openCmd: () => void;
  closeCmd: () => void;
  toggleNotif: () => void;
  toggleProfile: () => void;
  closeAll: () => void;
}

export const useAppStore = create<AppStore>()(
  devtools((set) => ({
    currentView: 'dashboard',
    sidebarOpen: true,
    cmdOpen: false,
    notifOpen: false,
    profileOpen: false,
    setView: (view) => set({ currentView: view, notifOpen: false, profileOpen: false }),
    toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
    openCmd: () => set({ cmdOpen: true, notifOpen: false, profileOpen: false }),
    closeCmd: () => set({ cmdOpen: false }),
    toggleNotif: () => set((s) => ({ notifOpen: !s.notifOpen, profileOpen: false, cmdOpen: false })),
    toggleProfile: () => set((s) => ({ profileOpen: !s.profileOpen, notifOpen: false, cmdOpen: false })),
    closeAll: () => set({ cmdOpen: false, notifOpen: false, profileOpen: false }),
  }))
);