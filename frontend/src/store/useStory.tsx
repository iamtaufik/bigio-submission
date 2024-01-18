import { create } from 'zustand';

type Story = {
  title: string;
  writer: string;
  synopsis: string;
  category: string;
  tags: string[];
  image?: string;
  status: string;
};

type StoryStore = {
  story: Story;
  addStory: (story: Story) => void;
  resetStory: () => void;
};

export const useStoryStore = create<StoryStore>()((set) => ({
  story: {
    title: '',
    writer: '',
    synopsis: '',
    category: '',
    tags: [],
    status: 'Published',
  },
  addStory: (story) =>
    set(() => ({
      story: story,
    })),
  resetStory: () =>
    set(() => ({
      story: {
        title: '',
        writer: '',
        synopsis: '',
        category: '',
        tags: [],
        status: 'Published',
      },
    })),
}));
