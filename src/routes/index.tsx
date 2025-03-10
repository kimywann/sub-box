import Signin from '../pages/Signin';
import MySubscriptions from '../pages/MySubscriptions';

import Layout from '../components/layout/Layout';

import { createBrowserRouter } from 'react-router-dom';
import RouteError from '../components/common/RouteError';

const routeList = [
  {
    path: '/',
    element: <MySubscriptions />,
  },
  {
    path: '/signin',
    element: <Signin />,
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
