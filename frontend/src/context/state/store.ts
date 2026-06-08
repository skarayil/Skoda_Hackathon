import { create } from 'zustand';

interface AppState {
  language: 'en' | 'cs';
  setLanguage: (lang: 'en' | 'cs') => void;
  selectedEmployeeId: string | null;
  setSelectedEmployeeId: (id: string | null) => void;
  selectedTeamId: string | null;
  setSelectedTeamId: (id: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
  selectedEmployeeId: null,
  setSelectedEmployeeId: (id) => set({ selectedEmployeeId: id }),
  selectedTeamId: null,
  setSelectedTeamId: (id) => set({ selectedTeamId: id }),
}));
