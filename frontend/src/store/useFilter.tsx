import { create } from 'zustand';

type Filter = {
    category: string;
    status: string;
}


type FilterStore = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

export const useFilterStore = create<FilterStore>()((set) => ({
  filter: {
    category: '',
    status: '',
  },
    setFilter: (filter) => set(() => ({ filter })),
}));
