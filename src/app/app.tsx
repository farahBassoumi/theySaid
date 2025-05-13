import Home from '../pages/Home';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
//import './App.css';
import { PUBLIC_ROUTES, ROUTES } from '@/core/routes/routes';
import { publicRoutes } from '@/core/routes/publicRoutes';
import { privateRoutes } from '@/core/routes/privateRoutes';
import Layout from '@/components/layouts/layout';
// import Providers from './components/providers/Providers.component';
// import { privateRoutes } from './core/routes/privateRoutes';
// import { publicRoutes } from './core/routes/publicRoutes';
// import RouteGuard from './core/routes/routeGuard';
// import { PUBLIC_ROUTES } from './core/routes/routes';
// import { initializeApp } from './core/services/cookie.service';
// import Layout from './modules/shared/layouts/layout';

function App() {
  //const isAuthenticated = false;
  const navigate = useNavigate();

  useEffect(() => {
    const validRoutes = [
      ...privateRoutes.map((r) => r.path),
      ...publicRoutes.map((r) => r.path),
    ];

    if (
      window.location.pathname === '/' ||
      !validRoutes.includes(window.location.pathname)
    ) {
      navigate(PUBLIC_ROUTES.Home, { replace: true });
    }
  }, []);

  return (
    <div className="">
      {/* <Providers> */}
      {/* <Home /> */}
      <Routes>
        <Route element={<Layout />}>
          {/* Public Routes */}
          {publicRoutes.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}

          {/* Protected Routes */}
          <Route >
            {privateRoutes.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="*" element={null} />
      </Routes>
      {/* </Providers> */}
    </div>
  );
}

export default App;
