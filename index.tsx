import React from 'react';
import ReactDOM from 'react-dom/client';
// FIX: Import `types.ts` ensures global JSX namespace augmentation is applied.
import './types';
import App from './App';
// Fix: Use named imports for react-router-dom to resolve module export errors.
import { HashRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);