import React, { useEffect, useState } from "react";
import { apiUrl } from "../config";
import Loader from "react-loader-spinner";
import Typography from "@material-ui/core/Typography";
import Head from "next/head";
import { useRouter } from "next/router";

function Page(props) {
  const router = useRouter();

  let urlData =
    props.apiResponse &&
    props.apiResponse.data &&
    props.apiResponse.data.metaData;

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (props.apiResponse) {
      setLoading(false);
      if (props.apiResponse.status === 200 && props.apiResponse.data) {
        window.location.replace(props.apiResponse.data.url);
      } else {
        setMessage(props.apiResponse.message);
      }
    }
  }, [props.apiResponse.urlData]);

  return (
    <div
      style={{
        marginLeft: "40vw",
        marginTop: "45vh",
      }}
    >
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

      {loading ? (
        <Loader
          type="Puff"
          color="#e3e2e1"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      ) : message ? (
        <Typography variant="h4" component="h4" gutterBottom>
          No URL found
        </Typography>
      ) : null}
    </div>
  );
}

export async function getServerSideProps(context) {
  let url = `${apiUrl}/url/${context.query.url}`;
  let requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(url, requestOptions);
  const resJson = await res.json();

  return {
    props: {
      apiResponse: resJson,
    },
  };
}

export default Page;
