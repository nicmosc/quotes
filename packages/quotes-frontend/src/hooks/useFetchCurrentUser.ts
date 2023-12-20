import { UserResponse } from '@quotes/schema';
import { useQuery } from 'react-query';

import { buildAPIUrl, useAuthToken } from '../providers';

const FIVE_MINUTES = 5 * 1000 * 60;

export const useFetchCurrentUser = () => {
  const { value } = useAuthToken();
  return useQuery<UserResponse>(
    ['currentUser', value],
    async () => {
      const response = await fetch(buildAPIUrl('/users/me'), {
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
      staleTime: FIVE_MINUTES,
    },
  );
};
