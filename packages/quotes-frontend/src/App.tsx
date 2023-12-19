import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider, UIProvider } from './providers';
import { Routes } from './routes/Routes';

export const App = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <UIProvider>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </UIProvider>
      </BrowserRouter>
    </StrictMode>
  );
};
