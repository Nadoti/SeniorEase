import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppRouterProvider } from './providers';
import '@/shared/styles/tokens.css';
import '@/shared/styles/accessibility.css';
import './styles/global.css';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouterProvider />
  </StrictMode>,
);
