import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home/Home'));
const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));

export const Routes = () => {
  const routeConfig = useRoutes([
    { path: `/`, element: <Home /> },
    { path: `/login`, element: <Login /> },
    { path: `/signup`, element: <Signup /> },
  ]);
  return <>{routeConfig}</>;
};
