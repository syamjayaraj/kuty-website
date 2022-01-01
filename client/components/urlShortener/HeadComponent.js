import Head from "next/head";

export default function HeadComponent() {
  return (
    <Head>
      <title>
        URL Shortener - Paste your lengthy URL and shorten it | Kuty.me
      </title>
      <meta name="theme-color" content="#000000" />
      <meta
        name="description"
        content="Kuty.me is the simplest URL shortener app. Paste your lengthy URL, press the Shorten button, and copy the short URL generated."
      />
      <meta name="og:type" content="website" />
      <meta
        name="og:title"
        content=" URL Shortener - Paste your lengthy URL and shorten it | Kuty.me"
      />
      <meta
        name="keywords"
        content="simple url shortener, kuty.me, kuty, kuty url short, link shortener, make url small"
      />
      <meta name="og:url" content="https://kuty.me" />
      <meta
        name="og:description"
        content="Kuty.me is the simplest URL shortener app. Paste your lengthy URL, press the Shorten button, and copy the short URL generated."
      />
      <meta name="og:image" content="/assets/images/kuty_logo.png" />
    </Head>
  );
}
