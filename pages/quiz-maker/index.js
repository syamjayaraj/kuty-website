import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  FormControl,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";
import Radium, { StyleRoot } from "radium";
import { useRouter } from "next/router";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { apiUrl } from "../../config";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { fadeInDown } from "react-animations";
import HeadComponent from "../../components/quiz/HeadComponent";
import classes from "../../styles/Quiz.module.css";
import Footer from "../../components/Footer";
import Instructions1 from "../../components/quiz/Instructions1";
import Instructions2 from "../../components/quiz/Instructions2";
import { ToastContainer, toast } from "react-toastify";
import TitleDescription from "../../components/quiz/TItleDescription";
import { ArrowRightAlt, Close, CheckCircle } from "@material-ui/icons";
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
    title: "",
    instructions: "",
  });
  const [questions, setQuestions] = useState([
    {
      title: "",
      options: [
        {
          label: "A",
          value: "",
        },
        {
          label: "B",
          value: "",
        },
        {
          label: "C",
          value: "",
        },
        {
          label: "D",
          value: "",
        },
      ],
      correctOption: "",
    },
  ]);

  const router = useRouter();

  useEffect(() => {
    if (router.query.slug) {
      qetQuiz(router.query.slug);
    }
  }, [router.query.slug]);

  let qetQuiz = (slug) => {
    let url = `${apiUrl}/quiz/${slug}`;
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
          if (res.data.questions.length !== 0) {
            setQuestions(req.data.questions);
          }
          delete res.data.questions;
          setQuiz(res.data);
        } else {
          toast.error("Unable to get the quiz");
        }
      })
      .catch((err) => {
        toast.error("Unable to get the quiz");
      });
  };

  let createQuiz = (e) => {
    e.preventDefault();
    if (title == "") {
      toast.error("Unable to create the quiz");
    } else {
      setCreatingQuiz(true);
      setQuiz({});
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
            console.log(res.data, "lorem");
            router.query.slug = res.data.slug;
            router.push(router);
          } else {
            toast.error("Unable to get the quiz");
          }
          setCreatingQuiz(false);
        })
        .catch((err) => {
          toast.error("Unable to get the quiz");
        });
    }
  };

  let updateQuiz = () => {
    let url = `${apiUrl}/quiz/${quiz._id}`;
    let requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        instructions: instructions,
        questions: questions,
      }),
    };
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        if (!res.data) {
          toast.error("Unable to update the quiz");
        }
      })
      .catch((err) => {
        toast.error("Unable to update the quiz");
      });
  };

  let handleQuestionTitle = (value, questionIndex) => {
    let questionsTemp = [...questions];
    questionsTemp[questionIndex].title = value;
    setQuestions(questionsTemp);
  };

  let handleQuestionOption = (value, questionIndex, optionIndex) => {
    let questionsTemp = [...questions];
    questionsTemp[questionIndex].options[optionIndex].value = value;
    setQuestions(questionsTemp);
  };

  let handleCorrectOption = (value, questionIndex, optionIndex) => {
    let questionsTemp = [...questions];
    questionsTemp[questionIndex].correctOption = value;
    setQuestions(questionsTemp);
  };

  let addQuestion = () => {
    // let questionsTemp = [
    //   ...questions,
    //   {
    //     title: "",
    //     options: [
    //       {
    //         label: "A",
    //         value: "",
    //       },
    //       {
    //         label: "B",
    //         value: "",
    //       },
    //       {
    //         label: "C",
    //         value: "",
    //       },
    //       {
    //         label: "D",
    //         value: "",
    //       },
    //     ],
    //     correctOption: "",
    //   },
    // ];
    // setQuestions(questionsTemp);
    // updateQuiz();
    addQuestion();
  };

  let removeQuestion = (questionIndex) => {
    let questionsTemp = [...questions];
    questionsTemp.splice(questionIndex, 1);
    setQuestions(questionsTemp);
    updateQuiz();
  };

  let publishQuiz = (e) => {
    e.preventDefault();
    let url = `${apiUrl}/quiz/${quiz._id}`;
    let requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        questions: questions,
      }),
    };
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
        } else {
          toast.error("Unable to update the quiz");
        }
      })
      .catch((err) => {
        toast.error("Unable to update the quiz");
      });
  };

  return (
    <div className={classes.root}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Container component="main" className={classes.main} maxWidth="sm">
        <HeadComponent />
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={createQuiz}
        >
          <TitleDescription />
          <Instructions1 />
          {quiz._id ? (
            <>
              <div className={classes.titleInstructionContainer}>
                <div className={classes.successMessage}>
                  <div>
                    <CheckCircle
                      style={{
                        color: "#85c76a",
                      }}
                    />
                  </div>
                  <Typography variant="body1">
                    Quiz created successfully
                  </Typography>
                </div>
                <div className={classes.titleInstruction}>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <Typography variant="body1">Title:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography variant="h5">{quiz.title}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <Typography variant="body1">Instructions:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography variant="body1">
                        {quiz.instructions}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              </div>
              <Instructions2 />
            </>
          ) : (
            <div>
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
            </div>
          )}
          {quiz._id ? null : (
            <div>
              <div className={classes.arrowContainer}>
                <ArrowDownwardIcon fontSize="medium" />
              </div>
              {creatingQuiz ? (
                <div className={classes.loaderContainer}>
                  <Loader
                    type="Puff"
                    color="#e3e2e1"
                    height={100}
                    width={100}
                  />
                </div>
              ) : (
                <Button
                  variant="outlined"
                  className={classes.button}
                  type="submit"
                >
                  Create Quiz
                </Button>
              )}
            </div>
          )}
        </form>

        {quiz._id ? (
          <div>
            {questions.map((question, questionIndex) => {
              return (
                <StyleRoot>
                  <div className={classes.shortenedUrl} style={styles.bounce}>
                    <form
                      className={classes.question}
                      noValidate
                      autoComplete="off"
                    >
                      <div className={classes.questionNumber}>
                        {questionIndex + 1}
                      </div>
                      <div
                        className={classes.closeIcon}
                        onClick={() => removeQuestion(questionIndex)}
                      >
                        <Close />
                      </div>

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
                            handleQuestionTitle(e.target.value, questionIndex)
                          }
                          color="primary"
                          variant="outlined"
                        />
                      </FormControl>
                      {question.options.map((option, optionIndex) => {
                        let correctOption =
                          questions[questionIndex].options[optionIndex]
                            .label === questions[questionIndex].correctOption
                            ? true
                            : false;

                        return (
                          <FormControl
                            fullWidth
                            className={classes.messageNumberInput}
                          >
                            <TextField
                              borderColor="green"
                              type="text"
                              id="outlined-name"
                              label={`Option ${option.label}`}
                              value={option.value}
                              name={option.label}
                              onChange={(e) =>
                                handleQuestionOption(
                                  e.target.value,
                                  questionIndex,
                                  optionIndex
                                )
                              }
                              color="primary"
                              variant="outlined"
                              InputProps={{
                                endAdornment: (
                                  <label className="radioContainer">
                                    <input
                                      onChange={() =>
                                        handleCorrectOption(
                                          option.label,
                                          questionIndex,
                                          optionIndex
                                        )
                                      }
                                      type="checkbox"
                                      checked={correctOption ? true : false}
                                    />
                                    <span className="checkmark"></span>
                                  </label>
                                ),
                              }}
                            />
                          </FormControl>
                        );
                      })}
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
                onClick={addQuestion}
              >
                Add Question
              </Button>
            )}
          </div>
        ) : null}
        {quiz._id ? (
          <div className={classes.publishContainer}>
            <div className={classes.leftSide}>
              <p>Publish the quiz to public after adding all questions</p>
              <ArrowRightAlt fontSize="medium" />
            </div>
            <Button
              variant="outlined"
              className={classes.publishButton}
              type="submit"
              onClick={publishQuiz}
            >
              Publish Quiz
            </Button>
          </div>
        ) : null}

        <Footer />
      </Container>
    </div>
  );
}
