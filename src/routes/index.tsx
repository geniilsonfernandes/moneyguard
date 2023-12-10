import ErrorPage from '@/components/ErrorPage';
import ExpenseView from '@/components/ExpenseView';
import Header from '@/components/Header';
import Dashboard from '@/pages/Dashboard';
import Expense from '@/pages/Expense';
import SingIn from '@/pages/SingIn';
import SingUp from '@/pages/SingUp';
import { useAppDispatch, useAppSelector } from '@/store';
import { getUser, login } from '@/store/reducers/auth';
import { useEffect } from 'react';

import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter
} from 'react-router-dom';

const WrapperLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="">{children}</div>;
};

const PublicLayout = () => {
  return (
    <WrapperLayout>
      <Outlet />
    </WrapperLayout>
  );
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
        errorElement: <ErrorPage />,
        children: [
          {
            path: '/expense-view/:id',
            element: <ExpenseView />,
            errorElement: <ErrorPage />
          }
        ]
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
      { path: '*', element: <Navigate to="/" replace /> }
    ]
  };
}

function PublicRoute(): {
  element: JSX.Element;
  children: RouteObject[];
} {
  return {
    element: <PublicLayout />,
    children: [
      { path: '/sign-up', element: <SingUp /> },
      { path: '/sign-in', element: <SingIn /> },
      { path: '*', element: <Navigate to="/sign-up" replace /> }
    ]
  };
}

export function AppRouter() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = getUser();

    if (user) {
      dispatch(login(user));
    }
  }, [dispatch]);

  const router = createBrowserRouter([isAuthenticated ? PrivateRoutes() : PublicRoute()]);

  return <RouterProvider router={router} />;
}
