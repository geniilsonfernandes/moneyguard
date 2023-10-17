import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { AppRouter } from '@/routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="custom-bg-color">
      dsd
      <AppRouter />
    </div>
  </React.StrictMode>
);
