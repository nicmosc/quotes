import { UserResponse } from '@quotes/schema';
import { useQuery } from 'react-query';

import { buildAPIUrl, useAuthToken } from '../providers';

const ONE_HOUR = 60 * 1000 * 60;

export const useFetchCurrentUser = () => {
  const { value } = useAuthToken();
  const url = buildAPIUrl('/users/me');
  return useQuery<UserResponse>(
    ['currentUser', value],
    async () => {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${value}`,
        },
      });
      if (!response.ok) {
        // TODO show error toast unauthorized
        throw new Error('Network response was not ok');
      }
      return await response.json();
    },
    {
      /**
       * By matching the stale time to the token expiration, we won't refetch
       * if the token hasn't changed and the stale time has not elapsed
       */
      staleTime: ONE_HOUR,
    },
  );
};
