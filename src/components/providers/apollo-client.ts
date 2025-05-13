import {
  ApolloClient,
  DefaultOptions,
  HttpLink,
  InMemoryCache,
  from,
} from '@apollo/client';

const link = from([
  new HttpLink({
    uri: 'HI', //TODO:centralised uri
  }),
]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  } as DefaultOptions,
});

export default client;
