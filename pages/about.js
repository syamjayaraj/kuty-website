import React from "react";
import { Container } from "@material-ui/core";
import renderHTML from "react-render-html";

import Head from "next/head";
import classes from "../styles/About.module.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function About() {
  return (
    <div className={classes.root}>
      <Head>
        <title>About | Kuty.me</title>
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

      <Container component="main" className={classes.main} maxWidth="sm">
        <Header />

        <div className={classes.about}>
          <h1>About Us</h1>
          {renderHTML(`<p><a href="https://kuty.me/" target="_blank" rel="noreferrer noopener">Kuty.me</a> is a simple URL shortener app. It converts the long and messy URLs to a short ones. Another tool provided by Kuty.me is a <a href="https://kuty.me/whatsapp-link-generator" target="_blank" rel="noreferrer noopener">Short Whatsapp link generator</a>. You can input your Whatsapp number and create a short link to share.</p>
<h2>The simplest URL shortener</h2>
<p>The human brain is designed to attract simple things. Long and messy URLs are always annoying. <a href="https://kuty.me/" target="_blank" rel="noreferrer noopener">Kuty.me</a> will help you to shorten long and messy URLs.</p>
<p>Here is a long and messy URL.</p>
<pre class="wp-block-preformatted"><a href="https://www.techomoro.com/create-a-dropdown-in-react-that-closes-when-click-outside/" target="_blank" rel="noreferrer noopener">https://www.techomoro.com/create-a-dropdown-in-react-that-closes-when-click-outside/</a></pre>
<p>Copy this URL, paste in <a href="https://kuty.me/" target="_blank" rel="noreferrer noopener">Kuty.me</a> and press the <strong>Shorten</strong> button. It will generate a short link. You can copy this short URL and share it anywhere.</p>
<p>After shortening it using <a href="https://kuty.me/" target="_blank" rel="noreferrer noopener">Kuty.me</a>, it will be like the one below.</p>
<pre class="wp-block-preformatted"><a href="https://kuty.me/9jl" target="_blank" rel="noreferrer noopener">https://kuty.me/9jl</a></pre>
<p>It is short, easier to read and memorize.</p>
<h2>Short Whatsapp link generator</h2>
<p><a href="https://kuty.me/whatsapp-link-generator" target="_blank" rel="noreferrer noopener">Kuty.me Short Whatsapp link generator</a> help you in generating a short link to your Whatsapp profile. Anyone clicking the link will direct them to your Whatsapp profile. So that they can easily message you with a click.</p>
<p>To generate your Whatsapp link, type your Whatsapp number with country code, type any message that you want people to see when they contact you, and press the Generate Short Link button. This will provide you with a short link to your Whatsapp profile.</p>
`)}
        </div>
        <Footer />
      </Container>
    </div>
  );
}
