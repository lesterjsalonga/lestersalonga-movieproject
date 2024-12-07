import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Register from './pages/Public/Register/Register';
import Login from './pages/Public/Login/Login';
import Dashboard from './pages/Main/Dashboard/Dashboard';
import Main from './pages/Main/Main';
import Movie from './pages/Main/Movie/Movie';
import Lists from './pages/Main/Movie/Lists/Lists';
import Form from './pages/Main/Movie/Form/Form';
import CastandCrew from './pages/Main/Movie/Form/CastandCrew/CastandCrew';
import Videos from './pages/Main/Movie/Form/Videos/Videos';
import Photo from './pages/Main/Movie/Form/Photos/Photos';
import { AuthProvider } from './utils/context/AuthToken';
import { AuthContext } from './utils/context/AuthToken';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/main',
    element: <Main />,
    children: [
      {
        path: '/main/dashboard',
        element: <Dashboard />,
      },
      {
        path: 'movies',
        element: <Movie />,
        children: [
          {
            path: '',
            element: <Lists />,
          },
          {
            path: 'form/:movieId?',
            element: <Form />,
            children: [
              {
                path: 'cast-and-crews/:tmdbId?',
                element: <CastandCrew />,
              },
              {
                path: 'videos/:tmdbId?',
                element: <Videos />,
              },
              {
                path: 'photos/:tmdbId?',
                element: <Photo />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
    <div className='App'>
      <RouterProvider router={router} />
    </div>
    </AuthProvider>
  );
}

export default App;