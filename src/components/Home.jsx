import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  TextField,
  FormControl,
  Button,
  InputAdornment,
  InputLabel,
  Input,
  IconButton,
  Typography,
  FormHelperText,
} from "@material-ui/core";
import { FileCopy } from "@material-ui/icons";
import isURL from "validator/lib/isURL";

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { apiUrl, siteUrl } from "../config";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { fadeInDown } from "react-animations";
import Radium, { StyleRoot } from "radium";
import { Helmet } from "react-helmet";

const useStyles = makeStyles((theme) => ({
  main: {
    textAlign: "center",
    marginTop: "10%",
    boxShadow: "0 2px 5px 0 #d43071, 0 8px 40px 0 rgb(10 14 29 / 6%)",
    padding: "5rem",
    paddingTop: "1rem",
  },
  shortenedUrl: {
    marginTop: "2rem",
  },
  button: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    "&:hover": {
      background: "#d43071",
    },
  },
  arrowContainer: {
    margin: "2rem 2rem",
  },
  logo: {
    width: 100,
    height: "auto",
    marginBottom: "2rem",
  },
}));

const styles = {
  bounce: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInDown, "fadeInDown"),
  },
};

export default function Home(props) {
  const classes = useStyles();

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
          }
          setShortening(false);
        });
    } else {
      setMessage({
        title: "Unable to shorten that link. It is not a valid url.",
        type: "invalid",
      });
    }
  };

  function copyShortenedUrl() {
    navigator.clipboard.writeText(siteUrl + "/" + shortenedUrl);
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
      <Helmet>
        <meta charset="utf-8" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />

        <title>
          URL Shortener - Paste your lengthy URL and shorten it | Kuty.me
        </title>
        <link rel="icon" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Kuty.me is the simplest URL shortener app. Paste your lengthy URL, press the Shorten button, and copy the short URL generated. The short URL will redirect to the lengthy URL you pasted."
        />
      </Helmet>

      <Container component="main" className={classes.main} maxWidth="sm">
        <img src="/assets/images/kuty_logo.png" className={classes.logo} />
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={shortenUrl}
        >
          <FormControl fullWidth className={classes.margin}>
            <TextField
              type="url"
              id="standard-basic"
              label="Paste your URL here"
              value={urlToShorten}
              pattern="https://.*"
              onChange={(e) => validateAndSetUrlToShorten(e.target.value)}
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
            <ArrowDownwardIcon fontSize="100" />
          </div>
          {shortening ? (
            <Loader
              type="Puff"
              color="#e3e2e1"
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
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
                <ArrowDownwardIcon fontSize="100" />
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
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={copyShortenedUrl}
                      >
                        {copyButtonClicked ? "Copied" : <FileCopy />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
          </StyleRoot>
        ) : null}
      </Container>
    </div>
  );
}
