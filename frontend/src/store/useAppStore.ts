import { create } from 'zustand';

interface AppState {
  language: 'en' | 'hi' | 'bn';
  setLanguage: (lang: 'en' | 'hi' | 'bn') => void;
  patientSession: {
    id: string | null;
    name: string | null;
    isReturning: boolean;
  };
  setPatientSession: (session: { id: string; name: string; isReturning: boolean }) => void;
  clearSession: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
  patientSession: {
    id: null,
    name: null,
    isReturning: false,
  },
  setPatientSession: (session) => set({ patientSession: session }),
  clearSession: () =>
    set({ patientSession: { id: null, name: null, isReturning: false } }),
}));
