import { create } from 'zustand';

type SearchStore = {
  q: string;
  setQ: (q: string) => void;
};

export const useSearchStore = create<SearchStore>()((set) => ({
  q: '',
  setQ: (q) => set(() => ({ q })),
}));
