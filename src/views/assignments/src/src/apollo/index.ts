import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import Cookies from 'universal-cookie';

const { GRAPHQL_URL } = process.env;
const cookies = new Cookies();

const enchancedFetch = (url: string, init: any) => {
  const token = cookies.get('jwt');
  return fetch(url, {
    ...init,
    headers: {
      ...init.headers,
      'Access-Control-Allow-Origin': '*',
      ...(token && { authorization: `Bearer ${token}` }),
    },
  }).then((response) => response);
};

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
  credentials: 'include',
  fetchOptions: {
    mode: 'cors',
  },
  fetch: enchancedFetch,
});

const cache = new InMemoryCache();

//main apollo client
const apollo = new ApolloClient({
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
  ssrMode: true, // Disables forceFetch on the server (so queries are only run once)
  link: httpLink,
  cache,
});

export default apollo;
