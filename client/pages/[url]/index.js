import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import Typography from "@material-ui/core/Typography";
import HeadComponent from "../../components/urlShortener/url/HeadComponent";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function Page(props) {
  let urlData =
    props?.apiResponse &&
    props?.apiResponse?.data &&
    props?.apiResponse?.data?.metaData;

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (props?.apiResponse) {
      setLoading(false);
      if (props?.apiResponse?.status === 200 && props?.apiResponse?.data) {
        window.location.replace(props?.apiResponse?.data?.url);
      } else {
        setMessage(props?.apiResponse.message);
      }
    }
  }, [props?.apiResponse]);

  return (
    <div
      style={{
        marginLeft: "40vw",
        marginTop: "45vh",
      }}
    >
      <HeadComponent urlData={urlData} />

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
  const forwarded = context?.req?.headers["x-forwarded-for"];
  const ip = forwarded
    ? forwarded.split(/, /)[0]
    : context?.req?.connection?.remoteAddress;
  let url = `${apiUrl}/url/get-url`;
  let requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      shortenedUrl: context.query.url,
      ip: ip,
    }),
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
