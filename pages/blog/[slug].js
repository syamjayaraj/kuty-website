import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import MoreStories from "../../components/more-stories";
import BlogHeader from "../../components/BlogHeader";
import PostHeader from "../../components/post-header";
import SectionSeparator from "../../components/section-separator";
import Layout from "../../components/layout";
import { getAllPostsWithSlug, getPostAndMorePosts } from "../../lib/api";
import PostTitle from "../../components/post-title";
import Head from "next/head";
import Tags from "../../components/tags";

export default function Post({ post, posts, preview }) {
  const router = useRouter();
  const morePosts = posts?.edges;

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  let metaDescription = post && post.excerpt.replace(/<[^>]+>/g, "");
  let keywords =
    post &&
    post.tags &&
    post.tags.edges.map((edge) => {
      return edge.node.name + ",";
    });
  keywords = keywords && keywords.toString();

  return (
    <Layout preview={preview}>
      <Container>
        <BlogHeader />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>{post.title} ← Blog | Kuty.me URL Shortener</title>
                <meta name="theme-color" content="#000000" />
                <meta name="description" content={metaDescription} />
                <meta name="og:type" content="blog" />
                <meta
                  name="og:title"
                  content={`${post.title} ← Blog | Kuty.me URL Shortener`}
                />
                <meta name="keywords" content={keywords} />
                <meta name="og:url" content="https://kuty.me/blog" />
                <meta name="og:description" content={metaDescription} />
                <meta
                  name="og:image"
                  content={post.featuredImage?.node?.sourceUrl}
                />
              </Head>

              <PostHeader
                title={post.title}
                coverImage={post.featuredImage?.node}
                date={post.date}
                author={post.author?.node}
                categories={post.categories}
              />
              <PostBody content={post.content} />
              <footer>
                {post.tags.edges.length > 0 && <Tags tags={post.tags} />}
              </footer>
            </article>

            <SectionSeparator />
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const data = await getPostAndMorePosts(params.slug, preview, previewData);

  return {
    props: {
      preview,
      post: data.post,
      posts: data.posts,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();

  return {
    paths: allPosts.edges.map(({ node }) => `/blog/${node.slug}`) || [],
    fallback: true,
  };
}
