import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#eaeaea"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#121212"
        />
      </Head>
      <body className="bg-light-500 text-dark-500 dark:bg-dark-500 dark:text-light-500">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
