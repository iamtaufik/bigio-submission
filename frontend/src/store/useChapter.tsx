import { create } from 'zustand';

type Chapter = {
  title: string;
  content: string;
  lastUpdate: Date;
};

type ChapterStore = {
  chapters: Chapter[];
  addChapter: (chapter: Chapter) => void;
  resetChapter: () => void;
};

export const useChapterStore = create<ChapterStore>()((set) => ({
  chapters: [],
  addChapter: (chapter) => set((state) => ({ chapters: [...state.chapters, chapter] })),
  resetChapter: () => set(() => ({ chapters: [] })),
}));
