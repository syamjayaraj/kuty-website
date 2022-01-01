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
import HeadComponent from "../components/whatsappLinkGenerator/HeadComponent";
import TitleDescription from "../components/whatsappLinkGenerator/TItleDescription";
import Instructions from "../components/whatsappLinkGenerator/Instructions";

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
      <HeadComponent />

      <Container component="main" className={classes.main} maxWidth="sm">
        <Header />
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={generateShortLink}
        >
          <TitleDescription />
          <Instructions />

          <FormControl fullWidth className={classes.mobileNumberInput}>
            <TextField
              type="number"
              id="standard-basic"
              label="Type your Whatsapp number here (including country code without +)"
              value={mobileNumberToGenerateLink}
              onChange={(e) => validateAndSetUrlToShorten(e.target.value)}
              color="primary"
              autoFocus={true}
              variant="outlined"
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
              variant="outlined"
            />
          </FormControl>

          <div className={classes.arrowContainer}>
            <ArrowDownwardIcon fontSize="medium" />
          </div>
          {shortening ? (
            <div className={classes.loaderContainer}>
              <Loader type="Puff" color="#e3e2e1" height={100} width={100} />
            </div>
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
                <ArrowDownwardIcon fontSize="medium" />
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
