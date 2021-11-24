import React, { useState } from "react";
import {
  Container,
  TextField,
  FormControl,
  Button,
  FormHelperText,
  Typography,
  Grid,
} from "@material-ui/core";
import Radium, { StyleRoot } from "radium";

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { apiUrl, siteUrl } from "../../config";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { fadeInDown } from "react-animations";
import Head from "next/head";
import classes from "../styles/Home.module.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const styles = {
  bounce: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInDown, "fadeInDown"),
  },
};

export default function Home(props) {
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
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
    if (title == "") {
      setMessage({
        title: "Title is required",
        type: "invalid",
      });
    } else {
      setCreatingQuiz(true);
      setQuiz({});
      setShareLinkCopyButtonClicked(false);
      let url = `${apiUrl}/quiz`;
      let requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          instructions: instructions,
        }),
      };
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then((res) => {
          if (res.data) {
            setMessage({
              title: "",
              type: "",
            });
            setQuiz(res.data);
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
  };

  function copyShortenedUrl(param) {
    navigator.clipboard.writeText(siteUrl + "/" + param);
    setShareLinkCopyButtonClicked(true);
  }

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
              <div>Press Start Creating Quiz button</div>
            </Grid>

            <Grid item xs={6} md={4} className={classes.point}>
              <div className={classes.number}>4</div>
              <div>Add questions, with options and correct answer</div>
            </Grid>
            <Grid item xs={6} md={4} className={classes.point}>
              <div className={classes.number}>5</div>
              <div>Press Finish button</div>
            </Grid>
            <Grid item xs={6} md={4} className={classes.point}>
              <div className={classes.number}>6</div>
              <div>Copy the shortened URL to share with your contestants</div>
            </Grid>
          </Grid>

          <FormControl fullWidth className={classes.messageNumberInput}>
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

          <FormControl fullWidth className={classes.mobileNumberInput}>
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

          <div className={classes.arrowContainer}>
            <ArrowDownwardIcon fontSize="medium" />
          </div>
          {quiz._id ? (
            <div>
              <Typography variant="body1">
                Quiz created successfully. Now start adding question and
                options.
              </Typography>

              <div className={classes.arrowContainer}>
                <ArrowDownwardIcon fontSize="medium" />
              </div>
            </div>
          ) : creatingQuiz ? (
            <Loader
              type="Puff"
              color="#e3e2e1"
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
          ) : (
            <Button variant="outlined" className={classes.button} type="submit">
              Start Creating Quiz
            </Button>
          )}
        </form>

        {quiz._id ? (
          <StyleRoot>
            <div className={classes.shortenedUrl} style={styles.bounce}>
              <form
                className={classes.question}
                noValidate
                autoComplete="off"
                onSubmit={createQuiz}
              >
                <div className={classes.questionNumber}>1</div>

                <FormControl fullWidth className={classes.mobileNumberInput}>
                  <TextField
                    type="textarea"
                    multiline
                    rows="3"
                    id="standard-basic"
                    label="Type the question"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    color="primary"
                    variant="outlined"
                  />
                </FormControl>

                <FormControl fullWidth className={classes.messageNumberInput}>
                  <TextField
                    type="text"
                    id="outlined-name"
                    label="Option A"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    color="primary"
                    variant="outlined"
                  />
                </FormControl>

                <FormControl fullWidth className={classes.messageNumberInput}>
                  <TextField
                    type="text"
                    id="outlined-name"
                    label="Option B"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    color="primary"
                    variant="outlined"
                  />
                </FormControl>

                <FormControl fullWidth className={classes.messageNumberInput}>
                  <TextField
                    type="text"
                    id="outlined-name"
                    label="Option C"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    color="primary"
                    variant="outlined"
                  />
                </FormControl>

                <FormControl fullWidth className={classes.messageNumberInput}>
                  <TextField
                    type="text"
                    id="outlined-name"
                    label="Option D"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    color="primary"
                    variant="outlined"
                  />
                </FormControl>

                {false ? (
                  <Loader
                    type="Puff"
                    color="#e3e2e1"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                  />
                ) : (
                  <Button
                    variant="outlined"
                    className={classes.addQuestionButton}
                    type="submit"
                  >
                    Add Question
                  </Button>
                )}
              </form>
            </div>
          </StyleRoot>
        ) : null}

        <Button
          variant="outlined"
          className={classes.addQuestionButton}
          type="submit"
        >
          Publish Quiz
        </Button>

        <Footer />
      </Container>
    </div>
  );
}
