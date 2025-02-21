import RouteError from '../components/common/RouteError';
import Layout from '../components/common/layout/Layout';
import Home from '../pages/Home';
import MySubscriptions from '../pages/MySubscriptions';
import SignPage from '../pages/SignPage';
import { createBrowserRouter } from 'react-router-dom';

const routeList = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signin',
    element: <SignPage />,
  },
  {
    path: '/subscriptions',
    element: <MySubscriptions />,
  },
];

const router = createBrowserRouter(
  routeList.map((item) => {
    return {
      ...item,
      element: <Layout>{item.element}</Layout>,
      errorElement: <RouteError />,
    };
  }),
);

export default router;
