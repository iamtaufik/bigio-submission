import { Link } from 'react-router-dom';
import FormDetailStory from '../components/FormDetailStory';

const DetailStory = () => {
  return (
    <>
      <div className="space-y-4">
        <div>
          <Link to="/">List Story</Link>
        </div>
        <h2 className="text-4xl font-semibold">Detail Story</h2>
        <FormDetailStory />
      </div>
    </>
  );
};

export default DetailStory;
