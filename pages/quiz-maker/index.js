import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  FormControl,
  Button,
  FormHelperText,
  Typography,
} from "@material-ui/core";
import Radium, { StyleRoot } from "radium";

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { apiUrl, siteUrl } from "../../config";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { fadeInDown } from "react-animations";
import HeadComponent from "../../components/quiz/HeadComponent";
import classes from "../../styles/Home.module.css";
import Footer from "../../components/Footer";
import Instructions from "../../components/quiz/Instructions";
import TitleDescription from "../../components/quiz/TItleDescription";
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
  const [quiz, setQuiz] = useState({
    questions: [],
  });
  const [questionTemp, setQuestionTemp] = useState({
    title: "",
    options: [],
  });
  const [shareLinkCopyButtonClicked, setShareLinkCopyButtonClicked] =
    useState(false);
  const [resultLinkCopyButtonClicked, setResultLinkCopyButtonClicked] =
    useState(false);
  const [quizesInLocalStorage, setQuizezInLocalStorage] = useState([]);
  const [message, setMessage] = useState({
    title: "",
    type: "",
  });

  useEffect(() => {
    let quizes = JSON.parse(localStorage.getItem("quizes"));
    setQuizezInLocalStorage(quizes);
  }, []);

  useEffect(() => {
    if (quiz._id) {
      let quizes = JSON.parse(localStorage.getItem("quizes"));
      setQuizezInLocalStorage([quizes, quiz._id]);
    }
  }, [quiz]);

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
            if (quizesInLocalStorage.length !== 0) {
              let newArray = [...quizesInLocalStorage, res.data._id];
              localStorage.setItem("quizes", JSON.stringify(newArray));
            } else {
              localStorage.setItem("quizes", JSON.stringify([res.data._id]));
            }
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

  return (
    <div className={classes.root}>
      <Container component="main" className={classes.main} maxWidth="sm">
        <HeadComponent />
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={createQuiz}
        >
          <TitleDescription />
          <Instructions />

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

        {true ? (
          <div>
            {quiz.questions &&
              quiz.questions.map((question) => {
                return (
                  <StyleRoot>
                    <div className={classes.shortenedUrl} style={styles.bounce}>
                      <form
                        className={classes.question}
                        noValidate
                        autoComplete="off"
                      >
                        <div className={classes.questionNumber}>1</div>

                        <FormControl
                          fullWidth
                          className={classes.mobileNumberInput}
                        >
                          <TextField
                            type="textarea"
                            multiline
                            rows="3"
                            id="standard-basic"
                            label="Type the question"
                            value={question.title}
                            onChange={(e) =>
                              handleQuestionTitle(e.target.value)
                            }
                            color="primary"
                            variant="outlined"
                          />
                        </FormControl>

                        <FormControl
                          fullWidth
                          className={classes.messageNumberInput}
                        >
                          <TextField
                            borderColor="green"
                            type="text"
                            id="outlined-name"
                            label="Option A"
                            value={title}
                            name="a"
                            onChange={(e) => setOption(e.target.value)}
                            color="primary"
                            variant="outlined"
                            InputProps={{
                              style: {
                                border: "2px solid #85c76a",
                              },
                              endAdornment: (
                                <label className="radioContainer">
                                  <input type="checkbox" checked="checked" />
                                  <span className="checkmark"></span>
                                </label>
                              ),
                            }}
                          />
                        </FormControl>
                      </form>
                    </div>
                  </StyleRoot>
                );
              })}
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
          </div>
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
