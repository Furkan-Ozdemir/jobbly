import "@/styles/globals.css";
import { ibmPlexSansHebrew } from "@/utils/fonts";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <style jsx global>{`
        :root {
          --ibm-sans-hebrew-font: ${ibmPlexSansHebrew.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </Layout>
  );
}
