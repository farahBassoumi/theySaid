import { lazy } from 'react';
import { ROUTES } from './routes';
import { NotFound } from '@pages';
const Profile = lazy(() =>
  import('@pages').then((screen) => ({ default: screen.Profile }))
);

export const privateRoutes = [
  { path: ROUTES.Profile, component: Profile },
  { path: ROUTES.NotFound, component: NotFound },
];
