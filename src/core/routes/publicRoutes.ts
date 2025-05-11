import { lazy } from 'react';
import { ROUTES } from './routes';
const Home = lazy(() =>
  import('@pages').then((screen) => ({ default: screen.Home }))
);

const About = lazy(() =>
  import('@pages').then((screen) => ({ default: screen.About }))
);

export const publicRoutes = [
  { path: ROUTES.Home, component: Home },
  { path: ROUTES.About, component: About },
];
