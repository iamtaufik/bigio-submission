import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { useChapterStore } from '../store/useChapter';
import { dateFormater } from '../libs/dateFormater';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useStoryStore } from '../store/useStory';
import Badge from './Badge';

const tags = ['Best', 'Mental illness', 'Short'];

const FormCreateStory = () => {
  const { story, addStory, resetStory } = useStoryStore();
  const { chapters, resetChapter } = useChapterStore();
  const [title, setTitle] = useState(story.title);
  const [writer, setWriter] = useState(story.writer);
  const [synopsis, setSynopsis] = useState(story.synopsis);
  const [category, setCategory] = useState(story.category);
  const [tag, setTag] = useState<string[]>(story.tags);
  const [image, setImage] = useState(story.image);
  const [status, setStatus] = useState(story.status);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSelectTags = (tg: string) => {
    // remove tag if has included
    if (tag.includes(tg)) {
      setTag((prev) => prev.filter((t) => t !== tg));
    } else {
      setTag((prev) => [...prev, tg]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      await axios.post('/stories', {
        title,
        writer,
        synopsis,
        category,
        tags: tag,
        image,
        status,
        chapters: chapters.map((ch) => ({
          title: ch.title,
          content: ch.content,
        })),
      });

      toast.success('Story created successfully');
      resetStory();
      resetChapter();
      navigate('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4 " onSubmit={handleSubmit}>
      <div className="flex items-center gap-14">
        <div className="flex flex-col w-1/2 gap-3">
          <label htmlFor="title" className="text-lg font-medium">
            Title
          </label>
          <input
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
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            id="category"
            defaultValue=""
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
              <Badge key={index} text={t} color={tag.includes(t) ? 'dark' : 'light'} onClick={() => handleSelectTags(t)} className="cursor-pointer" />
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
            onChange={() => setImage('')}
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
        <div className="flex justify-end">
          <Button
            className="text-white bg-blue-700 hover:bg-blue-800"
            text="Add Chapter"
            onClick={() => {
              addStory({
                title,
                writer,
                synopsis,
                category,
                tags: tag,
                image,
                status,
              });
              navigate('/management/add-story/chapter');
            }}
          />
        </div>
        <div>
          <table className="w-full border-2 table-auto">
            <thead>
              <tr>
                <th className="border-2">Title</th>
                <th className="border-2">Last Updated</th>
                <th className="border-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {chapters.map((ch, index) => {
                return (
                  <tr className="text-center" key={index}>
                    <td className="border-2">{ch.title}</td>
                    <td className="border-2">{dateFormater.format(ch.lastUpdate)}</td>
                    <td className="border-2">Action 1</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end gap-8">
        <Button className=" bg-slate-200" text="Cancel" onClick={() => navigate('/management')} />
        <Button disabled={isLoading} className={`text-white bg-blue-700 hover:bg-blue-800 `} text="Save" type="submit" />
      </div>
    </form>
  );
};

export default FormCreateStory;
