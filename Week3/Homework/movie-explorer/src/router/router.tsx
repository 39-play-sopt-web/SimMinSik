import { createBrowserRouter } from 'react-router';
import AppLayout from '../components/layout/AppLayout';
import MovieListPage from '../pages/MovieListPage';
import MovieDetailPage from '../pages/MovieDetailPage';
import NotFoundPage from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <MovieListPage /> },
      { path: 'movies/:movieId', element: <MovieDetailPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
