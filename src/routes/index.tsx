import ErrorPage from '@/components/ErrorPage';
import Header from '@/components/Header';
import NotFound from '@/components/NotFound';
import Dashboard from '@/pages/Dashboard';
import Expense from '@/pages/Expense';
import SingIn from '@/pages/SingIn';
import SingUp from '@/pages/SingUp';
import {
  Outlet,
  Navigate,
  createBrowserRouter,
  RouterProvider,
  RouteObject
} from 'react-router-dom';


import {
  useSession,

} from "@clerk/clerk-react";


const WrapperLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-slate-100">{children}</div>;
};

const Layout = () => {
  return (
    <WrapperLayout>
      <Header />
      <Outlet />
    </WrapperLayout>
  );
};

const Settings = () => {
  return (
    <WrapperLayout>
      <Header />
      <Outlet />
    </WrapperLayout>
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
        errorElement: <ErrorPage />
      },
      { path: '/expense/new', element: <Expense /> },
      { path: '/expense/:id', element: <Expense /> },
      {
        path: '/settings',
        element: <Settings />,
        children: [
          { path: '/settings/1', element: <div>settings 1</div> },
          { path: '/settings/2', element: <div>settings 2</div> }
        ]
      },
      { path: '*', element: <NotFound /> }
    ]
  };
}

function PublicRoute(): RouteObject[] {
  return [
    { path: '/sign-in', element: <SingIn /> },
    { path: '/sign-up', element: <SingUp /> },
    { path: '*', element: <Navigate to="/sign-in" replace /> }
  ];
}

const checkAuth = () => {
  const { isSignedIn } = useSession();

  if (!isSignedIn) {
    return false;
  }

  return true;
};

export function AppRouter() {
  const router = createBrowserRouter([checkAuth() ? PrivateRoutes() : {}, ...PublicRoute()]);

  return <RouterProvider router={router} />;
}
