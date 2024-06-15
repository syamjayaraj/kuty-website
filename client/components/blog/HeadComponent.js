import Head from "next/head";

export default function HeadComponent() {
  return (
    <Head>
      <title>Blog | Kuty.me</title>
      <meta name="theme-color" content="#000000" />
      <meta
        name="description"
        content="Kuty.me is the simplest URL shortener app. Paste your lengthy URL, press the Shorten button, and copy the short URL generated."
      />
      <meta name="og:type" content="website" />
      <meta name="og:title" content=" About | Kuty.me" />
      <meta
        name="keywords"
        content="about,kuty.me, kuty, about kuty url shortener, kuty whatsapp link generator"
      />
      <meta name="og:url" content="https://kuty.me/about" />
      <meta
        name="og:description"
        content="Kuty.me is the simplest URL shortener app. Paste your lengthy URL, press the Shorten button, and copy the short URL generated."
      />
      <meta name="og:image" content="/assets/images/kuty_logo.png" />
    </Head>
  );
}
