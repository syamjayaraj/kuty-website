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

import isMobilePhone from "validator/lib/isMobilePhone";

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { apiUrl, siteUrl } from "../config";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { fadeInDown } from "react-animations";
import Radium, { StyleRoot } from "radium";
import Head from "next/head";
import classes from "../styles/Home.module.css";
import Footer from "../components/Footer";
import DropdownLink from "../components/DropdownLink";
import Header from "../components/Header";

const styles = {
  bounce: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInDown, "fadeInDown"),
  },
};

export default function Home(props) {
  const [mobileNumberToGenerateLink, setMobileNumberToGenerateLink] =
    useState("");
  const [messageToGenerateLink, setMessageToGenerateLink] = useState("");
  const [shortening, setShortening] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [copyButtonClicked, setCopyButtonClicked] = useState(false);
  const [message, setMessage] = useState({
    title: "",
    type: "",
  });

  let generateShortLink = (e) => {
    e.preventDefault();
    if (isMobilePhone(mobileNumberToGenerateLink)) {
      setShortening(true);
      setShortenedUrl("");
      setCopyButtonClicked(false);
      let url = `${apiUrl}/url/shorten/whatsapp`;
      let requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobileNumber: mobileNumberToGenerateLink,
          message: messageToGenerateLink,
        }),
      };
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then((res) => {
          if (res.data) {
            setShortenedUrl(res.data.shortenedUrl);
          } else {
            setMessage({
              title:
                "Unable to generate the link. It is not a valid mobile number",
              type: "invalid",
            });
          }
          setShortening(false);
        })
        .catch((err) => {
          setMessage({
            title:
              "Unable to generate the link. It is not a valid mobile number",
            type: "invalid",
          });
        });
    } else {
      setMessage({
        title: "Unable to generate the link. It is not a valid mobile number",
        type: "invalid",
      });
    }
  };

  function copyShortenedUrl(param) {
    navigator.clipboard.writeText(siteUrl + "/" + param);
    setCopyButtonClicked(true);
  }

  let validateAndSetUrlToShorten = (url) => {
    if (isMobilePhone(url)) {
      setMessage({
        title: "Great! It is a valid mobile number.",
        type: "valid",
      });
    } else {
      setMessage({
        title: "",
        type: "",
      });
    }
    setMobileNumberToGenerateLink(url);
  };

  return (
    <div className={classes.root}>
      <Head>
        <title>
          Whatsapp Link Generator - Create a Whatsapp Link and Share on
          Instagram, Facebook, YouTube, Twitter etc. | Kuty.me
        </title>
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Kuty.me provides the simplest Whatsapp link generator. Type your Whatsapp number, press the Generate Short Link button, and copy the short URL generated."
        />
        <meta name="og:type" content="website" />
        <meta
          name="og:title"
          content="Whatsapp Link Generator - Create a Whatsapp Link and Share on
          Instagram, Facebook, YouTube, Twitter etc. | Kuty.me"
        />
        <meta
          name="keywords"
          content="whatsapp link generator, kuty.me whatsapp link, kuty, short whatsapp link, link shortener, make whatsapp url small"
        />
        <meta name="og:url" content="https://kuty.me/whatsapp-link-generator" />
        <meta
          name="og:description"
          content="Kuty.me provides the simplest Whatsapp link generator. Type your Whatsapp number, press the Generate Short Link button, and copy the short URL generated."
        />
        <meta name="og:image" content="/assets/images/kuty_logo.png" />
      </Head>

      <Container component="main" className={classes.main} maxWidth="sm">
        <Header />
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={generateShortLink}
        >
          <Typography variant="h2" component="h2" className={classes.title}>
            Whatsapp Link Generator
          </Typography>
          <Typography variant="p" component="p" className={classes.description}>
            <a href="https://kuty.me/whatsapp-link-generator" target="_blank">
              Kuty.me Whatsapp Link Generator
            </a>{" "}
            will help you to create a short link to your WhatsApp profile.
            Anyone who clicks the link will direct them to your WhatsApp
            profile. So that they can easily contact you via Whatsapp.
          </Typography>
          <Grid container spacing={2} className={classes.points}>
            <Grid item xs={6} md={4} className={classes.point}>
              <div className={classes.number}>1</div>
              <div>Type your Whatsapp number with country code</div>
            </Grid>
            <Grid item xs={6} md={4} className={classes.point}>
              <div className={classes.number}>2</div>
              <div>Type a message (optional)</div>
            </Grid>
            <Grid item xs={6} md={4} className={classes.point}>
              <div className={classes.number}>3</div>
              <div>You will get the shortened URL to your Whatsapp profile</div>
            </Grid>
          </Grid>

          <FormControl fullWidth className={classes.mobileNumberInput}>
            <TextField
              type="number"
              id="standard-basic"
              label="Type your Whatsapp number here (including country code)"
              value={mobileNumberToGenerateLink}
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

          <FormControl fullWidth className={classes.messageNumberInput}>
            <TextField
              type="textarea"
              multiline
              rows="3"
              id="standard-basic"
              label="Type any message (optional)"
              value={messageToGenerateLink}
              onChange={(e) => setMessageToGenerateLink(e.target.value)}
              color="primary"
            />
          </FormControl>

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
              Generate Short Link
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
                  Your shortened Whatsapp URL
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
                        className={classes.copyButton}
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
