import { createBrowserRouter } from 'react-router';
import { BoardPage } from '../pages/BoardPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: BoardPage,
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
]);
