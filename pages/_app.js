import Head from "next/head";
import "@/styles/globals.css";
import { ibmPlexSansHebrew } from "@/utils/fonts";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Jobbly</title>
      </Head>
      <style jsx global>{`
        :root {
          --ibm-sans-hebrew-font: ${ibmPlexSansHebrew.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </Layout>
  );
}
