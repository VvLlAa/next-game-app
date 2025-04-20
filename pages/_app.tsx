import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { wrapper } from '@/store';
import '@/styles/global.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/global.scss';
import { Navbar } from '@/components/Header/Navbar';

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Navbar />
      <Component {...props.pageProps} />
    </Provider>
  );
};

export default MyApp;
