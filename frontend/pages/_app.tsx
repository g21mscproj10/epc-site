import '../styles/globals.css';
import type { AppProps } from 'next/app';
import type { ReactNode, ReactElement } from 'react';
import type { NextPage } from 'next';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { AppContextWrapper } from '../context/state';

const ENV: any = process.env['ENV'];

const client = new ApolloClient({
  link: new (createHttpLink as any)({
    uri:
      process.env.NODE_ENV == 'development'
        ? 'http://localhost:8000/graphql'
        : 'https://greenhouse-backend-production.up.railway.app/graphql',
  }),
  cache: new InMemoryCache(),
});

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <AppContextWrapper>
      <ApolloProvider client={client}>
        {getLayout(<Component {...pageProps} />)}
      </ApolloProvider>
    </AppContextWrapper>
  );
}

export default MyApp;
