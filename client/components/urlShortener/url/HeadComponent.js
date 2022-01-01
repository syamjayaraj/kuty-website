import Head from "next/head";

export default function HeadComponent(props) {
  let { urlData } = props;
  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{urlData && urlData.title}</title>
      <link rel="icon" href={urlData && urlData.icon} />
      <meta name="description" content={urlData && urlData.description} />

      <meta name="theme-color" content="#000000" />

      <meta name="og:type" content="website" />
      <meta name="og:title" content={urlData && urlData.title} />

      <meta
        name="og:url"
        content={
          props.apiResponse &&
          props.apiResponse.data &&
          props.apiResponse.data.url
        }
      />
      <meta name="og:description" content={urlData && urlData.description} />
      <meta name="og:image" content={urlData && urlData.image} />
    </Head>
  );
}
