import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeProvider } from './contexts/ThemeContext';
import Loader from './components/Loader';

// Lazy load the applications to ensure code separation and faster initial loads for public users.
// This ensures regular visitors do not download Admin-related bundles.
const App = React.lazy(() => import('./App'));
const AdminPage = React.lazy(() => import('./pages/AdminPage'));

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// Client-side routing entry point
// Determines which "App" to mount based on the URL path
const path = window.location.pathname;

if (path.startsWith('/admin')) {
  // Mount the Admin Application
  // AdminPage requires the ThemeProvider to be wrapped explicitly here
  root.render(
    <React.StrictMode>
      <ThemeProvider>
        <Suspense fallback={<Loader />}>
          <AdminPage />
        </Suspense>
      </ThemeProvider>
    </React.StrictMode>
  );
} else {
  // Mount the Public Front-facing Application
  // App.tsx handles its own Context Providers (Theme, Language, etc.)
  root.render(
    <React.StrictMode>
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    </React.StrictMode>
  );
}
