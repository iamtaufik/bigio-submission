import { Link } from 'react-router-dom';
import FormEditStory from '../components/FormEditStory';

const EditStory = () => {
  return (
    <>
      <div className="space-y-4">
        <div className='flex '>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>

          <Link to="/">List Story</Link>
        </div>
        <h2 className="text-4xl font-semibold">Edit Story</h2>
        <FormEditStory />
      </div>
    </>
  );
};

export default EditStory;
