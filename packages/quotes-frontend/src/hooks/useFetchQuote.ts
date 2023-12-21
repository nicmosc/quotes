import { QuoteRequest, QuoteResponse } from '@quotes/schema';
import qs from 'query-string';
import { useQuery } from 'react-query';

import { buildAPIUrl, useAuthToken } from '../providers';

export const useFetchQuote = ({ maxLength, tags }: QuoteRequest = {}) => {
  const { value } = useAuthToken();
  return useQuery<QuoteResponse>(['quote', value], async () => {
    const url = qs.stringifyUrl({
      url: buildAPIUrl('/quotes/random'),
      query: { maxLength, tags },
    });
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
  });
};
