import { Html, Head, Main, NextScript } from "next/document";

export default function Document(): React.ReactNode {
  return (
    <Html>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
