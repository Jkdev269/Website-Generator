import '../app/globals.css'

import { WebsiteProvider } from '../lib/context/WebsiteContext';

function MyApp({ Component, pageProps }) {
  return (
    <WebsiteProvider>
      <Component {...pageProps} />
    </WebsiteProvider>
  );
}

export default MyApp;