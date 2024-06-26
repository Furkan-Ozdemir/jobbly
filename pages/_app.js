import Head from "next/head";
import "@/styles/globals.css";
import { ibmPlexSansHebrew } from "@/utils/fonts";
import Layout from "@/components/Layout";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <SpeedInsights />
      <Analytics />
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
      <Toaster
        toastOptions={{
          style: {
            fontSize: "1.5rem",
            minWidth: "250px",
          },
          duration: 3000,
        }}
      />
    </SessionProvider>
  );
}
