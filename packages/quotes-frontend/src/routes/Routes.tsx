import { Navigate, Route, Routes as BrowserRoutes } from 'react-router-dom';

import { useAuth } from '../providers';
import { Login } from './Login';
import { Quotes } from './Quotes';

export const Routes = () => {
  const authState = useAuth();

  if (authState.status === 'unauthenticated') {
    return (
      <BrowserRoutes>
        <Route path="/login/*" element={<Login />} />
        <Route path="*" element={<Navigate to={'/login'} replace />} />
      </BrowserRoutes>
    );
  }

  return (
    <BrowserRoutes>
      <Route path="/" element={<Quotes />} />
      <Route path="*" element={<Navigate to={'/'} replace />} />
    </BrowserRoutes>
  );
};
