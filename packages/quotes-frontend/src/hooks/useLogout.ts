import { useAuthToken } from '../providers';

export const useLogout = () => {
  // TODO call /logout endpoint
  const { setToken } = useAuthToken();

  return {
    logout: () => setToken('undefined'),
  };
};
