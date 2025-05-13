import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ComponentProps } from '@types';
//Jotai
import { DEFAULT_QUERY_CLIENT_OPTIONS } from './query-client';

const Providers = ({ children }: ComponentProps) => {
  const queryClient = new QueryClient(DEFAULT_QUERY_CLIENT_OPTIONS);

  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    </QueryClientProvider>
  );
};

export default Providers;
