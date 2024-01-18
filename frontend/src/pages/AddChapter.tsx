import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Button from '../components/Button';
import { FormEvent, useState } from 'react';
import { convertToRaw, EditorState } from 'draft-js';
import { draftToMarkdown } from 'markdown-draft-js';
import { useChapterStore } from '../store/useChapter';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddChapter = () => {
  const { addChapter } = useChapterStore();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const navigate = useNavigate();

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);

    // convert to raw
    const rawContentState = convertToRaw(editorState.getCurrentContent());

    // convert to markdown
    const markdown = draftToMarkdown(rawContentState);

    setStory(markdown);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const chapter = {
      title,
      content: story,
      lastUpdate: new Date(),
    };

    addChapter(chapter);
    toast.success('Add chapter success');
    navigate('/management/add-story');
  };

  console.log(story);

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-semibold">Add Chapter</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <label htmlFor="title" className="text-lg font-medium">
            Title
          </label>
          <input
            type="text"
            placeholder="Title"
            id="title"
            name="title"
            className="flex w-full h-10 px-3 py-2 text-base border rounded-md border-slate-600 bg-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="story" className="text-lg font-medium">
            Story
          </label>
          <Editor
            editorState={editorState}
            placeholder="Story"
            editorClassName="border border-slate-600 rounded-md px-3 min-h-[150px] cursor-text ring-offeset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-800 focus-within:ring-offset-2"
            onEditorStateChange={onEditorStateChange}
            toolbar={{
              options: ['inline', 'list', 'link', 'history', 'image'],
              inline: {
                options: ['bold', 'italic', 'underline'],
              },
              image: {
                inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                alt: { present: false, mandatory: false },
                defaultSize: {
                  height: 'auto',
                  width: 'auto',
                },
              },
            }}
          />
        </div>
        <div className="flex justify-end gap-8">
          <Button className=" bg-slate-200" text="Cancel" onClick={() => navigate("/management/add-story")}/>
          <Button className="text-white bg-blue-700 hover:bg-blue-800" text="Save" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default AddChapter;
