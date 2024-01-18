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

axios.defaults.baseURL = import.meta.env.VITE_API_ENDPOINT;
const NotFound = () => <div>404</div>;

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <StoryLists />,
      },
      {
        path: 'management',
        children: [
          {
            index: true,
            element: <Management />,
          },
          {
            path: 'add-story',
            children: [
              {
                index: true,
                element: <AddStory />,
              },
              {
                path: 'chapter',
                children: [
                  {
                    index: true,
                    element: <AddChapter />,
                  },
                ],
              },
            ],
          },
          {
            path: 'edit-story/:storyId',
            element: <EditStory />,
          },
          {
            path: 'detail-story/:storyId',
            element: <DetailStory />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
