import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
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
        <meta name="robots" content="index, follow" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
