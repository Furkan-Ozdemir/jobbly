import Head from "next/head";
import "@/styles/globals.css";
import { ibmPlexSansHebrew } from "@/utils/fonts";
import Layout from "@/components/Layout";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Head>
          <title>Jobbly</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <style jsx global>{`
          :root {
            --ibm-sans-hebrew-font: ${ibmPlexSansHebrew.style.fontFamily};
          }
        `}</style>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
