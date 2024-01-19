import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StoryLists from './components/StoryLists.tsx';
import AddStory from './pages/AddStory.tsx';
import AddChapter from './pages/AddChapter.tsx';
import EditStory from './pages/EditStory.tsx';
import DetailStory from './pages/DetailStory.tsx';
import axios from 'axios';
import Management from './pages/Management.tsx';
import NotFound from './pages/NotFound.tsx';

axios.defaults.baseURL = import.meta.env.VITE_API_ENDPOINT;

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <StoryLists />,
      },
      {
        path: '/management',
        element: <Management />,
      },
      {
        path: '/management/add-story',
        element: <AddStory />,
      },
      {
        path: '/management/edit-story/:storyId',
        element: <EditStory />,
      },
      {
        path: '/management/detail-story/:storyId',
        element: <DetailStory />,
      },
      {
        path: '/management/add-story/chapter',
        element: <AddChapter />,
      }
    ],
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
