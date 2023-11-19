import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouter } from '@/routes';
import { Provider } from 'react-redux';
import { store } from './store';
import { ClerkProvider, ClerkLoading, ClerkLoaded } from '@clerk/clerk-react';
import Loader from './components/Loader';

import './index.css';
if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
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
  </React.StrictMode>
);
