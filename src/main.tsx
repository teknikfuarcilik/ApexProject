import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App.tsx';
import './index.css';
import './i18n';
import { ErrorBoundaryProvider } from './components/ErrorBoundary';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundaryProvider>
      <App />
      <Toaster position="top-right" />
    </ErrorBoundaryProvider>
  </StrictMode>
);