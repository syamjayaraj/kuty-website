import React, { useEffect, useState } from "react";
import { apiUrl } from "../config";
import Loader from "react-loader-spinner";
import Typography from "@material-ui/core/Typography";
import { Helmet } from "react-helmet";

function Page(props) {
  const [loading, setLoading] = useState(false);
  const [urlData, setUrlData] = useState({});

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (props.match.params.url) {
      fetchUrlFromShortenedUrl();
    }
  }, []);

  let fetchUrlFromShortenedUrl = () => {
    setLoading(true);
    let url = `${apiUrl}/url/${props.match.params.url}`;
    let requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          setUrlData(res.data);
          window.location.replace(res.data.url);
        } else {
          setMessage(res.message);
        }
        setLoading(false);
      });
  };

  return (
    <div
      style={{
        marginLeft: "40vw",
        marginTop: "45vh",
      }}
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>{urlData.title}</title>
        <link rel="icon" href={urlData.icon} />
        <meta name="description" content={urlData.description} />
      </Helmet>

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
export default Page;
