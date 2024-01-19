import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './pages/Layout';
import StoryLists from './components/StoryLists';
import Management from './pages/Management';
import AddStory from './pages/AddStory';
import AddChapter from './pages/AddChapter';
import DetailStory from './pages/DetailStory';
import EditStory from './pages/EditStory';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<StoryLists />} />
            <Route path="/management" element={<Management />} />
            <Route path="/management/add-story" element={<AddStory />} />
            <Route path="/management/add-story/chapter" element={<AddChapter />} />
            <Route path="/management/detail-story/:storyId" element={<DetailStory />} />
            <Route path="/management/edit-story/:storyId" element={<EditStory />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
