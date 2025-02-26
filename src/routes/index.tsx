import Home from '../pages/Home';
import Signin from '../pages/Signin';
import MySubscriptions from '../pages/MySubscriptions';

import Layout from '../components/common/layout/Layout';

import { createBrowserRouter } from 'react-router-dom';
import RouteError from '../components/common/RouteError';

const routeList = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/mypage',
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
