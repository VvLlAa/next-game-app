import React, { FC } from 'react';
import { Provider, useSelector } from 'react-redux';
import { AppProps } from 'next/app';
import { AppState, wrapper } from '@/store';
import '@/styles/global.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from '@/components/UI/Navbar';
import Spinner from '@/components/UI/Spinner';
import { NextRouter } from 'next/router';

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <InnerApp
        Component={Component}
        pageProps={props.pageProps}
        router={props.router}
      />
    </Provider>
  );
};

interface InnerAppProps {
  Component: AppProps['Component'];
  pageProps: AppProps['pageProps'];
  router: NextRouter;
}

const InnerApp: FC<InnerAppProps> = ({ Component, pageProps, router }) => {
  const loading = useSelector((state: AppState) => state.games.loading);

  return (
    <>
      <Navbar />
      {loading && <Spinner />}
      <Component {...pageProps} router={router} />
    </>
  );
};

export default MyApp;
