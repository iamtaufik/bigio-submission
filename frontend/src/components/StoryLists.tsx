import { toast } from 'react-toastify';
import Button from './Button';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import Badge from './Badge';
import { useDebounce } from 'use-debounce';
import { ShowModal } from './ModalFilter';
import { useFilterStore } from '../store/useFilter';

type Story = {
  id: number;
  title: string;
  writer: string;
  category: string;
  tags: string[];
  status: string;
};

const StoryLists = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState<Story[]>([]);
  const { filter, setFilter } = useFilterStore();
  const [search, setSearch] = useState('');
  const [debounceValue] = useDebounce(search, 1000);

  const getStories = async () => {
    try {
      if ((filter.category !== '' || filter.status !== '') && search === '') {
        const { data } = await axios.get(`/stories?category=${filter.category}&status=${filter.status}`);
        setStories(data.data as Story[]);
        return;
      }

      if (search !== '') {
        const { data } = await axios.get(`/stories?search=${search}`);
        setStories(data.data as Story[]);
        return;
      }
      const { data } = await axios.get('/stories');
      setStories(data.data as Story[]);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      console.error(error);
    }
  };

  useEffect(() => {
    getStories();
    return () => {};
  }, [debounceValue, filter]);
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="w-1/3 text-5xl font-semibold">List Story</h2>
        <div className="flex items-center justify-end w-2/3 gap-4">
          <input
            type="text"
            className="flex w-full max-w-xs px-3 py-2 text-base border rounded-md border-slate-600 bg-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Search by writer's name/title story"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div
            className="p-2 rounded-full bg-slate-200"
            onClick={() =>
              ShowModal({
                title: 'Filter',
                positiveText: 'Filter',
                negativeText: 'Cancel',
                onPositiveClick: () => {
                  getStories();
                  setFilter({
                    category: '',
                    status: '',
                  });
                },
              })
            }
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
              />
            </svg>
          </div>
          <Button
            text="Add Story"
            className="text-white bg-blue-700 hover:bg-blue-800"
            onClick={() => {
              navigate('/management/add-story');
            }}
          />
        </div>
      </div>
      <div>
        <table className="w-full border-2 table-auto">
          <thead>
            <tr className="">
              <th className="py-2 border-2">Title</th>
              <th className="py-2 border-2">Writers</th>
              <th className="py-2 border-2">Category</th>
              <th className="py-2 border-2">Tags</th>
              <th className="py-2 border-2">Status</th>
              <th className="py-2 border-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {stories.map((story) => {
              return (
                <tr className="text-center " key={story.id}>
                  <td className="py-2 border-2">{story.title}</td>
                  <td className="py-2 border-2">{story.writer}</td>
                  <td className="py-2 border-2">{story.category}</td>
                  <td className="py-2 border-2 ">
                    <div className="flex items-center justify-center gap-2">
                      {story.tags.map((tag, index) => {
                        return <Badge key={index} text={tag} color="dark" />;
                      })}
                    </div>
                  </td>
                  <td className="py-2 border-2 ">
                    <div className="flex justify-center">
                      <Badge text={story.status} color="light" />
                    </div>
                  </td>
                  <td className="py-2 border-2">
                    <div className="flex justify-around">
                      <div className="px-4 py-2 text-white bg-blue-500 cursor-pointer rounded-2xl">
                        <Link to={`/management/detail-story/${story.id}`}>
                          <span>Detail</span>
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StoryLists;
