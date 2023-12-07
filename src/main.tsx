import { AppRouter } from '@/routes';
import { ClerkLoaded, ClerkLoading, ClerkProvider } from '@clerk/clerk-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Loader from './components/Loader';
import { store } from './store';

import './index.css';
if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById('root')!).render(
  //   <React.StrictMode>
  <ClerkProvider publishableKey={clerkPubKey}>
    <ClerkLoading>
      <div className="w-full h-[80vh] flex justify-center items-center">
        <Loader />
      </div>
    </ClerkLoading>
    <ClerkLoaded>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ClerkLoaded>
  </ClerkProvider>
  //   </React.StrictMode>
);
