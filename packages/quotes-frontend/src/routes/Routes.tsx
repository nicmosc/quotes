import { Route, Routes as BrowserRoutes } from 'react-router-dom';

import { Login } from './Login';
import { Quotes } from './Quotes';

export const Routes = () => {
  return (
    <BrowserRoutes>
      <Route path="/login/*" element={<Login />} />
      <Route path="/" element={<Quotes />} />
    </BrowserRoutes>
  );
};
