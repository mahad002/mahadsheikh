import { ThemeProvider } from '../components/ThemeProvider';
import Layout from "../components/Layout";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}