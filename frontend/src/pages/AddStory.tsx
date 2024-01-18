import FormCreateStory from '../components/FormCreateStory';
import { Link } from 'react-router-dom';

const AddStory = () => {
  return (
    <>
      <div className="space-y-4">
        <div>
          <Link to="/">List Story</Link>
        </div>
        <h2 className="text-4xl font-semibold">Add Story</h2>
        <FormCreateStory />
      </div>
    </>
  );
};

export default AddStory;
