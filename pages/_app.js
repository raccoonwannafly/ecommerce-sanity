import React from 'react';

// Adds toast context
import { Toaster } from 'react-hot-toast';

import { Layout } from '../components';
import '../styles/globals.css';
import { CartContext } from '../context/CartContext';

function MyApp({ Component, pageProps }) {
  return (
    <CartContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </CartContext>
  )
}

export default MyApp
