import { User } from '@quotes/schema';
import { createContext, PropsWithChildren, useContext } from 'react';
import { Loading } from 'react-daisyui';
import { useLocalStorage } from 'usehooks-ts';

import { useFetchCurrentUser } from '../hooks';

const AUTH_KEY = 'auth_token';

interface Me extends User {}

export interface LocalSessionValue {
  token: string; // auth token returned by BE
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthToken = () => {
  const [value, setValue] = useLocalStorage<LocalSessionValue['token']>(AUTH_KEY, '');
  return {
    value,
    setToken: setValue,
  };
};

export type AuthState = { status: `ok`; me: Me } | { status: `unauthenticated`; me: undefined };

const AuthContext = createContext<AuthState>({ status: `unauthenticated`, me: undefined });

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { value: authToken } = useAuthToken();

  const { data, isLoading } = useFetchCurrentUser();
  if (isLoading) {
    return (
      <div className="flex justify-center align h-full">
        <Loading size="lg" color="primary" />
      </div>
    );
  }

  const isAuthenticated = authToken != null && data != null;

  return (
    <AuthContext.Provider
      value={
        isAuthenticated
          ? { status: 'ok', me: data.data }
          : { status: 'unauthenticated', me: undefined }
      }>
      {children}
    </AuthContext.Provider>
  );
};
