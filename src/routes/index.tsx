import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home'));

export const Routes = () => {
  const routeConfig = useRoutes([{ path: `/`, element: <Home /> }]);
  return <>{routeConfig}</>;
};
