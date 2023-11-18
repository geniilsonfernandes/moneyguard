import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { AppRouter } from '@/routes';
import { store } from './store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
);
