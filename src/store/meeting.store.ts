import { create } from 'zustand';
import type { Meeting } from '@/types';

interface MeetingStore {
  meetings: Meeting[];
  currentMeeting: Meeting | null;
  isRecording: boolean;
  recordingSeconds: number;
  setMeetings: (m: Meeting[]) => void;
  setCurrentMeeting: (m: Meeting | null) => void;
  setRecording: (v: boolean) => void;
  tickTimer: () => void;
  resetTimer: () => void;
}

export const useMeetingStore = create<MeetingStore>((set) => ({
  meetings: [],
  currentMeeting: null,
  isRecording: false,
  recordingSeconds: 0,
  setMeetings: (meetings) => set({ meetings }),
  setCurrentMeeting: (currentMeeting) => set({ currentMeeting }),
  setRecording: (isRecording) => set({ isRecording }),
  tickTimer: () => set((s) => ({ recordingSeconds: s.recordingSeconds + 1 })),
  resetTimer: () => set({ recordingSeconds: 0 }),
}));