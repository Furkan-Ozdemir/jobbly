import Head from "next/head";
import "@/styles/globals.css";
import { ibmPlexSansHebrew } from "@/utils/fonts";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Jobbly</title>
        <meta
          name="description"
          content="Jobbly is an internship/new grad role finder app."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="tags"
          content="internship, job, new grad, jobbly, software engineering"
        />
        <meta
          name="author"
          content="Furkan Özdemir, linkedin.com/in/furkan-o-demir/"
        />
        <meta property="og:title" content="Jobbly" />
        <meta
          property="og:description"
          content="Jobbly is an internship/new grad role finder app."
        />
        <meta property="og:type" content="website" />
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
