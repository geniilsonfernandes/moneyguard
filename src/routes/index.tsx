import ErrorPage from '@/components/ErrorPage';
import ExpenseView from '@/components/ExpenseView';
import Header from '@/components/Header';
import NotFound from '@/components/NotFound';
import Dashboard from '@/pages/Dashboard';
import Expense from '@/pages/Expense';
import SingIn from '@/pages/SingIn';
import SingUp from '@/pages/SingUp';
import { useAppDispatch } from '@/store';
import { login, logout } from '@/store/reducers/auth';
import { useSession } from '@clerk/clerk-react';
import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter
} from 'react-router-dom';

const WrapperLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-slate-100">{children}</div>;
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
            errorElement: <ErrorPage />,
            ErrorBoundary: () => <ErrorPage />
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
      { path: '*', element: <NotFound /> }
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
      { path: '/sign-in', element: <SingIn /> },
      { path: '/sign-up', element: <SingUp /> },
      { path: '*', element: <Navigate to="/sign-in" replace /> }
    ]
  };
}

export function AppRouter() {
  const dispatch = useAppDispatch();
  const { isSignedIn, session } = useSession();

  console.log({ isSignedIn, session });

  if (!isSignedIn) {
    dispatch(logout());
  } else {
    dispatch(
      login({
        clerk_user_id: session.user.id,
        user_id: session.user.id,
        email: session.publicUserData.identifier,
        name: session.user.fullName || ''
      })
    );
  }

  const router = createBrowserRouter([isSignedIn ? PrivateRoutes() : PublicRoute()]);

  return <RouterProvider router={router} />;
}
