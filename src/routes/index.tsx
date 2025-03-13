import Signin from '@pages/Signin';
import MyPage from '@/pages/MyPage';

import Layout from '@components/layout/Layout';
import RouteError from '@components/common/RouteError';

import { createBrowserRouter } from 'react-router-dom';

const routeList = [
  {
    path: '/',
    element: <MyPage />,
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
