import Dashboard from '@/pages/Dashboard';
import {
  Outlet,
  Navigate,
  createBrowserRouter,
  RouterProvider,
  RouteObject
} from 'react-router-dom';

const Layout = () => {
  return <Outlet />;
};

const Settings = () => {
  return (
    <div>
      <h1>Settings</h1>
      <Outlet />
    </div>
  );
};

export function PrivateRoutes(): {
  element: JSX.Element;
  children: RouteObject[];
} {
  return {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
        errorElement: <div>Not found</div>
      },
      {
        path: '/settings',
        element: <Settings />,
        children: [
          { path: '/settings/1', element: <div>settings 1</div> },
          { path: '/settings/2', element: <div>settings 2</div> }
        ]
      },
      { path: '*', element: <Navigate to="/" replace /> }
    ]
  };
}

function PublicRoute(): RouteObject[] {
  return [
    { path: '/login', element: <div>login</div> },
    { path: '*', element: <Navigate to="/login" replace /> }
  ];
}

const checkAuth = () => {
  return true;
};

export function AppRouter() {
  const router = createBrowserRouter([checkAuth() ? PrivateRoutes() : {}, ...PublicRoute()]);

  return <RouterProvider router={router} />;
}
