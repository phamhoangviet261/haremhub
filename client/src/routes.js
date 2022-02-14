import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import Map from './pages/Map';
import Messenger from './pages/Messenger';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------
import Anime from './pages/Anime';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        // { path: 'user', element: <User /> },
        { 
          path: 'manga', 
          element: <Products type={'Manga'}/> 
        },
        { 
          path: 'anime', 
          element: <Products type={'Anime'}/>,           
        },
        { path: 'blog', element: <Blog /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    {
      path: '/anime',
      element: <DashboardLayout />,
      children: [
        { path: ':name', element: <Anime></Anime> },
      ]
    },
    {
      path: '/manga',
      element: <DashboardLayout />,
      children: [
        { path: ':name', element: <Anime></Anime> },
      ]
    },
    {
      path: '/search',
      element: <DashboardLayout />,
      children: [
        { path: ':name', element: <Products type={'Search'}/> },
      ]
    },
    {
      path: '/map',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <Map/> },
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
