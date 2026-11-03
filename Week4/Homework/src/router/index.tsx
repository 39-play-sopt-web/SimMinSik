import { createBrowserRouter } from 'react-router';
import { BoardPage } from '../pages/BoardPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { AuthorizationPage } from '../pages/AuthorizationPage';
import { PostEditorPage } from '../pages/PostEditorPage';
import { requireAuthorization } from './requireAuthorization';

export const router = createBrowserRouter([
  {
    path: '/auth',
    Component: AuthorizationPage,
  },
  {
    path: '/posts/new',
    loader: requireAuthorization,
    Component: PostEditorPage,
  },
  {
    path: '/posts/:postId/edit',
    loader: requireAuthorization,
    Component: PostEditorPage,
  },
  {
    path: '/',
    Component: BoardPage,
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
]);
