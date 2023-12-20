import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider, NetworkProvider, UIProvider } from './providers';
import { Routes } from './routes/Routes';

export const App = () => {
  return (
    <StrictMode>
      <NetworkProvider>
        <BrowserRouter>
          <UIProvider>
            <AuthProvider>
              <Routes />
            </AuthProvider>
          </UIProvider>
        </BrowserRouter>
      </NetworkProvider>
    </StrictMode>
  );
};
