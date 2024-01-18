import { useParams } from 'react-router-dom';
import { dateFormater } from '../libs/dateFormater';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const tags = ['Best', 'Mental illness', 'Short'];

type Chapter = {
  id: number;
  title: string;
  content: string;
  updatedAt: Date;
};

const FormDetailStory = () => {
  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [category, setCategory] = useState('');
  const [tag, setTag] = useState<string[]>([]);
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('');
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const { storyId } = useParams();

  const getStoriesById = async (id: number) => {
    try {
      const { data } = await axios.get(`/stories/${id}`);
      setTitle(data.data.title);
      setWriter(data.data.writer);
      setSynopsis(data.data.synopsis);
      setCategory(data.data.category);
      setTag(data.data.tags);
      setStatus(data.data.status);
      setImage(data.data.image);
      setChapters(data.data.chapters);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }

      console.error(error);
    }
  };

  useEffect(() => {
    getStoriesById(Number(storyId));
  }, [storyId]);

  return (
    <form className="pb-10 space-y-4">
      <div className="flex items-center gap-14">
        <div className="flex flex-col w-1/2 gap-3">
          <label htmlFor="title" className="text-lg font-medium">
            Title
          </label>
          <input
            disabled
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            className="flex w-full h-10 px-3 py-2 text-base border rounded-md border-slate-600 bg-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="flex flex-col w-1/2 gap-3">
          <label htmlFor="writer" className="text-lg font-medium">
            Writer Name
          </label>
          <input
            disabled
            value={writer}
            onChange={(e) => setWriter(e.target.value)}
            type="text"
            name="writer"
            id="writer"
            placeholder="Writer name"
            className="flex w-full h-10 px-3 py-2 text-base border rounded-md border-slate-600 bg-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="sypnosis" className="text-lg font-medium">
          Synopsis
        </label>
        <textarea
          disabled
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
          name="sypnosis"
          id="sypnosis"
          cols={30}
          rows={5}
          placeholder="Sypnosis"
          className="flex w-full px-3 py-2 text-base border rounded-md border-slate-600 bg-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        ></textarea>
      </div>
      <div className="flex gap-14">
        <div className="flex flex-col w-1/2 gap-3">
          <label htmlFor="category" className="text-lg font-medium">
            Category
          </label>
          <select
            disabled
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            id="category"
            className="flex w-full h-10 px-3 py-2 text-base border rounded-md border-slate-600 bg-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="" hidden>
              Select a category
            </option>
            <option value="Financial">Financial</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
          </select>
        </div>
        <div className="flex flex-col w-1/2 gap-3">
          <label htmlFor="tag" className="text-lg font-medium">
            Tag/Keyword Story
          </label>
          <div className="flex justify-center h-10 gap-4 border border-slate-600">
            {tags.map((t, index) => (
              <div aria-disabled key={index} className={`px-4 py-2 rounded-2xl ${tag.includes(t) ? 'text-white bg-blue-800' : 'text-white bg-slate-500'}`}>
                <p className="font-semibold">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-14">
        <div className="flex flex-col w-1/2 gap-3">
          <label htmlFor="image" className="text-lg font-medium">
            Cover Iamge
          </label>
          <input
            value={image}
            disabled
            type="file"
            name="image"
            id="image"
            className="flex w-full px-3 py-2 text-base border rounded-md border-slate-600 bg-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="flex flex-col w-1/2 gap-3">
          <label htmlFor="status" className="text-lg font-medium">
            Status
          </label>
          <select
            disabled
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            name="status"
            id="status"
            className="flex w-full px-3 py-2 text-base border rounded-md border-slate-600 bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Publish</option>
          </select>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <table className="w-full border-2 table-auto">
            <thead>
              <tr>
                <th className="border-2">Title</th>
                <th className="border-2">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {chapters.map((ch, index) => {
                return (
                  <tr className="text-center" key={index}>
                    <td className="border-2">{ch.title}</td>
                    <td className="border-2">{dateFormater.format(new Date(Date.parse(String(ch.updatedAt))))}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </form>
  );
};

export default FormDetailStory;
