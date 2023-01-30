// scroll bar
import 'simplebar/src/simplebar.css';

// lightbox
import 'react-image-lightbox/style.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

import cookie from 'cookie';
import { ReactElement, ReactNode } from 'react';
// next
import { NextPage } from 'next';
import Head from 'next/head';
import App, { AppProps, AppContext } from 'next/app';
//
import { ApolloProvider } from '@apollo/client';
// utils
import { getSettings } from '../utils/getSettings';
// contexts
import { SettingsProvider } from '../contexts/SettingsContext';
import { CollapseDrawerProvider } from '../contexts/CollapseDrawerContext';
// theme
import ThemeProvider from '../theme';
// components
import { SettingsValueProps } from '../components/settings/type';
import ProgressBar from '../components/ProgressBar';
import NotistackProvider from '../components/NotistackProvider';
import MotionLazyContainer from '../components/animate/MotionLazyContainer';

import { AuthProvider } from '../contexts/JWTContext';
import apollo from '../apollo'

// ----------------------------------------------------------------------

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  settings: SettingsValueProps;
  Component: NextPageWithLayout;
}

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps, settings } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <AuthProvider>
        <ApolloProvider client={apollo}>
          <CollapseDrawerProvider>
            <SettingsProvider defaultSettings={settings}>
              <MotionLazyContainer>
                <ThemeProvider>
                  <NotistackProvider>
                    <ProgressBar />
                    {getLayout(<Component {...pageProps} />)}
                  </NotistackProvider>
                </ThemeProvider>
              </MotionLazyContainer>
            </SettingsProvider>
          </CollapseDrawerProvider>
        </ApolloProvider>
      </AuthProvider>
    </>
  );
}

// ----------------------------------------------------------------------

MyApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);

  const cookies = cookie.parse(
    context.ctx.req ? context.ctx.req.headers.cookie || '' : document.cookie
  );

  const settings = getSettings(cookies);

  return {
    ...appProps,
    settings,
  };
};
