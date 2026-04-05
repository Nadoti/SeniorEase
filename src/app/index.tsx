import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AppRouterProvider } from './providers';

import '@/shared/ui/tokens.css';
import '@/shared/ui/accessibility.css';
import './styles/global.css';
import { RecoilRoot } from 'recoil';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <AppRouterProvider />
    </RecoilRoot>
  </StrictMode>,
);
