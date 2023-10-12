import {
  Outlet,
  Navigate,
  createBrowserRouter,
  RouterProvider,
  RouteObject
} from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <h1>Layout privado</h1>
      <Outlet />
    </div>
  );
};

const Dash = () => {
  throw new Error('Something went wrong');
  return (
    <div>
      <h1>Dashboard</h1>
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
        element: <Dash />,
        errorElement: <div>Not found</div>
      },
      { path: '/settings', element: <div>settings</div> },
      { path: '*', element: <Navigate to="/" replace /> }
    ]
  };
}

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
    </div>
  );
};

function PublicRoute() {
  return [
    { path: '/login', element: <Login /> },
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
