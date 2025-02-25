import Home from '../pages/Home';
import SignPage from '../pages/SignPage';
import MyPage from '../pages/MyPage';

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
    element: <SignPage />,
  },
  {
    path: '/mypage',
    element: <MyPage />,
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
