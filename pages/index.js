import React, { useState } from "react";
import {
  Container,
  TextField,
  FormControl,
  Button,
  InputAdornment,
  InputLabel,
  Input,
  IconButton,
  FormHelperText,
  Typography,
  Grid,
} from "@material-ui/core";

import { FileCopy } from "@material-ui/icons";
import isURL from "validator/lib/isURL";

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { apiUrl, siteUrl } from "../config";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { fadeInDown } from "react-animations";
import Radium, { StyleRoot } from "radium";
import Head from "next/head";
import classes from "../styles/Home.module.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

const styles = {
  bounce: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInDown, "fadeInDown"),
  },
};

export default function Home(props) {
  const [urlToShorten, setUrlToShorten] = useState("");
  const [shortening, setShortening] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [copyButtonClicked, setCopyButtonClicked] = useState(false);
  const [message, setMessage] = useState({
    title: "",
    type: "",
  });

  let shortenUrl = (e) => {
    e.preventDefault();
    if (isURL(urlToShorten)) {
      setShortening(true);
      setShortenedUrl("");
      setCopyButtonClicked(false);
      let url = `${apiUrl}/url/shorten`;
      let requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: urlToShorten }),
      };
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then((res) => {
          if (res.data) {
            setShortenedUrl(res.data.shortenedUrl);
            // copyShortenedUrl(res.data.shortenedUrl);
          } else {
            setMessage({
              title: "Unable to shorten that link. It is not a valid url.",
              type: "invalid",
            });
          }
          setShortening(false);
        })
        .catch((err) => {
          setMessage({
            title: "Unable to shorten that link. It is not a valid url.",
            type: "invalid",
          });
        });
    } else {
      setMessage({
        title: "Unable to shorten that link. It is not a valid url.",
        type: "invalid",
      });
    }
  };

  function copyShortenedUrl(param) {
    navigator.clipboard.writeText(siteUrl + "/" + param);
    setCopyButtonClicked(true);
  }

  let validateAndSetUrlToShorten = (url) => {
    if (isURL(url)) {
      setMessage({
        title: "Great! It is a valid url.",
        type: "valid",
      });
    } else {
      setMessage({
        title: "",
        type: "",
      });
    }
    setUrlToShorten(url);
  };

  return (
    <div className={classes.root}>
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

      <Container component="main" className={classes.main} maxWidth="sm">
        <Header />
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={shortenUrl}
        >
          <Typography variant="h2" component="h2" className={classes.title}>
            The Simplest URL Shortener
          </Typography>
          <Typography variant="body1" className={classes.description}>
            People don't like long and messy URLs.{" "}
            <a href="https://kuty.me" target="_blank">
              Kuty.me
            </a>{" "}
            will help you to shorten any lengthy URL in just one click.
          </Typography>
          <Grid container spacing={2} className={classes.points}>
            <Grid item xs={6} md={4} className={classes.point}>
              <div className={classes.number}>1</div>
              <div>Paste your lengthy URL</div>
            </Grid>
            <Grid item xs={6} md={4} className={classes.point}>
              <div className={classes.number}>2</div>
              <div>Press the Shorten button</div>
            </Grid>
            <Grid item xs={6} md={4} className={classes.point}>
              <div className={classes.number}>3</div>
              <div>You will get the shortened URL</div>
            </Grid>
          </Grid>

          <FormControl fullWidth className={classes.margin}>
            <TextField
              type="url"
              id="standard-basic"
              label="Paste your lengthy URL here"
              value={urlToShorten}
              pattern="https://.*"
              onChange={(e) => validateAndSetUrlToShorten(e.target.value)}
              color="primary"
              autoFocus={true}
            />
          </FormControl>
          {message.title ? (
            <FormHelperText
              style={
                message.type == "valid" ? { color: "green" } : { color: "red" }
              }
              id="component-error-text"
            >
              {message.title}
            </FormHelperText>
          ) : null}

          <div className={classes.arrowContainer}>
            <ArrowDownwardIcon fontSize="medium" />
          </div>
          {shortening ? (
            <div className={classes.loaderContainer}>
              <Loader type="Puff" color="#e3e2e1" height={100} width={100} />
            </div>
          ) : (
            <Button variant="outlined" className={classes.button} type="submit">
              Shorten
            </Button>
          )}
        </form>
        {shortenedUrl ? (
          <StyleRoot>
            <div className={classes.shortenedUrl} style={styles.bounce}>
              <div className={classes.arrowContainer}>
                <ArrowDownwardIcon fontSize="medium" />
              </div>

              <FormControl fullWidth className={classes.margin}>
                <InputLabel htmlFor="standard-adornment-password">
                  Shortened URL
                </InputLabel>
                <Input
                  type="url"
                  id="standard-adornment-password"
                  label="Shortened URL"
                  value={siteUrl + "/" + shortenedUrl}
                  color="red"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => copyShortenedUrl(shortenedUrl)}
                      >
                        {copyButtonClicked ? "Copied" : <FileCopy />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {message.title ? (
                <FormHelperText
                  style={{
                    color: "green",
                  }}
                >
                  Shortened URL is copied to clipboard
                </FormHelperText>
              ) : null}
            </div>
          </StyleRoot>
        ) : null}
        <Footer />
      </Container>
    </div>
  );
}
