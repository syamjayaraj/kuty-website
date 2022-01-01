import Head from "next/head";
import Container from "../../components/container";
import MoreStories from "../../components/more-stories";
import HeroPost from "../../components/hero-post";
import BlogHeader from "../../components/BlogHeader";
import Layout from "../../components/layout";
import { getAllPostsForHome } from "../../lib/api";

export default function Index({ allPosts: { edges }, preview }) {
  const heroPost = edges[0]?.node;
  const morePosts = edges.slice(1);

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>
            Blog | Kuty.me URL Shortener - Paste your lengthy URL and shorten it
          </title>
          <meta name="theme-color" content="#000000" />
          <meta
            name="description"
            content="Kuty.me is the simplest URL shortener app. Paste your lengthy URL, press the Shorten button, and copy the short URL generated."
          />
          <meta name="og:type" content="blog" />
          <meta
            name="og:title"
            content="Blog | Kuty-me - URL Shortener - Paste your lengthy URL and shorten it"
          />
          <meta
            name="keywords"
            content="simple url shortener, kuty.me, kuty, kuty url short, link shortener, make url small, whatsapp link, quiz maker"
          />
          <meta name="og:url" content="https://kuty.me/blog" />
          <meta
            name="og:description"
            content="Kuty.me is the simplest URL shortener app. Paste your lengthy URL, press the Shorten button, and copy the short URL generated."
          />
          <meta name="og:image" content="/assets/images/kuty_logo.png" />
        </Head>
        <Container>
          <BlogHeader />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.featuredImage?.node}
              date={heroPost.date}
              author={heroPost.author?.node}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview);
  return {
    props: { allPosts, preview },
  };
}
