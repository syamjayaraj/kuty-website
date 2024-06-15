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
} from "@material-ui/core";

import isURL from "validator/lib/isURL";

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { apiUrl, siteUrl } from "../config";
import Loader from "react-loader-spinner";
import { fadeInDown } from "react-animations";
import Radium, { StyleRoot } from "radium";
import classes from "../styles/Home.module.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeadComponent from "../components/urlShortener/HeadComponent";
import TitleDescription from "../components/urlShortener/TItleDescription";
import Instructions from "../components/urlShortener/Instructions";

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
      <HeadComponent />
      <Container component="main" className={classes.main} maxWidth="sm">
        <Header />
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={shortenUrl}
        >
          <TitleDescription />
          <Instructions />

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
                        {copyButtonClicked ? "Copied" : "Copy"}
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
