import '../app/globals.css'
import { ThemeProvider } from '../lib/context/ThemeContext';
import { WebsiteProvider } from '../lib/context/WebsiteContext';

export default function App({ Component, pageProps }) {
  return (
 <ThemeProvider>
    <WebsiteProvider>
      <Component {...pageProps} />
    </WebsiteProvider>
    </ThemeProvider>
   
  );
}