import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import urlJoin from 'url-join';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

// eslint-disable-next-line react-refresh/only-export-components
export const buildAPIUrl = (target: string) => {
  return urlJoin(import.meta.env.VITE_API_URL, target);
};

export const NetworkProvider = ({ children }: PropsWithChildren) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
