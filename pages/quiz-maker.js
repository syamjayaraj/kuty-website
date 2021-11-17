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

import isEmail from "validator/lib/isEmail";

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
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [email, setEmail] = useState("");
  const [creatingQuiz, setCreatingQuiz] = useState(false);
  const [quiz, setQuiz] = useState({});
  const [shareLinkCopyButtonClicked, setShareLinkCopyButtonClicked] =
    useState(false);
  const [resultLinkCopyButtonClicked, setResultLinkCopyButtonClicked] =
    useState(false);

  const [message, setMessage] = useState({
    title: "",
    type: "",
  });

  let createQuiz = (e) => {
    e.preventDefault();
    if (isEmail(email) || email == "") {
      if (title == "") {
        setMessage({
          title: "Title is required",
          type: "invalid",
        });
      } else {
        setCreatingQuiz(true);
        setQuiz("");
        setShareLinkCopyButtonClicked(false);
        let url = `${apiUrl}/url/quiz`;
        let requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            instructions: instructions,
            email: email,
          }),
        };
        fetch(url, requestOptions)
          .then((res) => res.json())
          .then((res) => {
            if (res.data) {
              setCreatingQuiz(res.data);
            } else {
              setMessage({
                title: "Unable to create the quiz",
                type: "invalid",
              });
            }
            setCreatingQuiz(false);
          })
          .catch((err) => {
            setMessage({
              title: "Unable to create the quiz",
              type: "invalid",
            });
          });
      }
    } else {
      setMessage({
        title: "Check your Email",
        type: "invalid",
      });
    }
  };

  function copyShortenedUrl(param) {
    navigator.clipboard.writeText(siteUrl + "/" + param);
    setShareLinkCopyButtonClicked(true);
  }

  let validateEmail = (param) => {
    if (isEmail(param)) {
      setMessage({
        title: "",
        type: "",
      });
      setEmail(param);
    } else {
      setMessage({
        title: "Enter a valid Email",
        type: "Invalid",
      });
    }
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
          onSubmit={createQuiz}
        >
          <Typography variant="h2" component="h2" className={classes.title}>
            Simple Quiz Maker
          </Typography>
          <Typography variant="body1" className={classes.description}>
            Using&nbsp;
            <a href="https://kuty.me/quiz-maker" target="_blank">
              Kuty.me Quiz Maker
            </a>
            , you can create a quiz with multiple-choice questions.
            <p>
              After you finish creating the quiz, a short link will be provided
              to share with your contestants. They can participate in the quiz
              by clicking the link.
            </p>
            <p>
              Another link and password will be provided where you can check the
              result.
            </p>
          </Typography>
          <Grid container spacing={2} className={classes.points}>
            <Grid item xs={6} md={4} className={classes.point}>
              <div className={classes.number}>1</div>
              <div>Enter a tile for the quiz</div>
            </Grid>

            <Grid item xs={6} md={4} className={classes.point}>
              <div className={classes.number}>2</div>
              <div>Instructions for your contestants</div>
            </Grid>
            <Grid item xs={6} md={4} className={classes.point}>
              <div className={classes.number}>3</div>
              <div>Enter Your Email</div>
            </Grid>
            <Grid item xs={6} md={4} className={classes.point}>
              <div className={classes.number}>3</div>
              <div>Press Add Questions button</div>
            </Grid>
            <Grid item xs={6} md={4} className={classes.point}>
              <div className={classes.number}>4</div>
              <div>Copy the shortened URL to share with your contestants</div>
            </Grid>
            <Grid item xs={6} md={4} className={classes.point}>
              <div className={classes.number}>4</div>
              <div></div>
            </Grid>
          </Grid>

          <FormControl fullWidth className={classes.mobileNumberInput}>
            <TextField
              type="text"
              id="outlined-name"
              label="Enter a title for the quiz"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              color="primary"
              variant="outlined"
            />
          </FormControl>

          <FormControl fullWidth className={classes.messageNumberInput}>
            <TextField
              type="textarea"
              multiline
              rows="3"
              id="standard-basic"
              label="Type instructions for your contestants (optional)"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              color="primary"
              variant="outlined"
            />
          </FormControl>

          <FormControl fullWidth className={classes.messageNumberInput}>
            <TextField
              type="email"
              id="standard-basic"
              label="Enter your Email (optional)"
              value={email}
              onChange={(e) => validateEmail(e.target.value)}
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

          <div className={classes.arrowContainer}>
            <ArrowDownwardIcon fontSize="100" />
          </div>
          {creatingQuiz ? (
            <Loader
              type="Puff"
              color="#e3e2e1"
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
          ) : (
            <Button variant="outlined" className={classes.button} type="submit">
              Create the quiz
            </Button>
          )}
        </form>

        {quiz._id ? (
          <Grid container spacing={2} className={classes.points}>
            <Grid item xs={6} md={4} className={classes.point}>
              The short link for your audience
            </Grid>
          </Grid>
        ) : null}

        <Footer />
      </Container>
    </div>
  );
}
