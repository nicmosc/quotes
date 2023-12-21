import { TagsResponse } from '@quotes/schema';
import { useQuery } from 'react-query';

import { buildAPIUrl, useAuthToken } from '../providers';

export const useFetchTags = () => {
  const { value } = useAuthToken();
  return useQuery<TagsResponse>(['tags', value], async () => {
    const response = await fetch(buildAPIUrl('/quotes/tags'), {
      headers: {
        Authorization: `Bearer ${value}`,
      },
    });
    if (!response.ok) {
      // TODO show error toast unauthorized
      throw new Error('Network response was not ok');
    }
    return await response.json();
  });
};
