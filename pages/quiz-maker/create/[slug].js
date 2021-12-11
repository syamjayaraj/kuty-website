import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  FormControl,
  Button,
  Typography,
  Grid,
  List,
} from "@material-ui/core";
import Radium, { StyleRoot } from "radium";
import { useRouter } from "next/router";
import Link from "next/link";
import { siteUrl } from "../../../config";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { fadeInDown } from "react-animations";
import HeadComponent from "../../../components/quiz/HeadComponent";
import classes from "../../../styles/Quiz.module.css";
import Footer from "../../../components/Footer";
import Instructions2 from "../../../components/quiz/Instructions2";
import { ToastContainer, toast } from "react-toastify";
import TitleDescription from "../../../components/quiz/TItleDescription";
import { ArrowRightAlt, Close, CheckCircle } from "@material-ui/icons";
import {
  getQuiz,
  addQuestion,
  deleteQuestion,
  publishQuiz,
} from "../../../lib/quiz";
import Swal from "sweetalert2";

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
  const [question, setQuestion] = useState({
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
    correctOption: "A",
  });
  const [addingQuestion, setAddingQuestion] = useState(false);
  const [quizToken, setQuizToken] = useState("");

  const [quiz, setQuiz] = useState({
    title: "",
    instructions: "",
  });
  const [questions, setQuestions] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (router.query.slug) {
      let quizesInLocalStorage = JSON.parse(localStorage.getItem("quizes"));
      if (quizesInLocalStorage && quizesInLocalStorage.length !== 0) {
        let quizTokenInLocalStorage = false;
        quizesInLocalStorage.map((item) => {
          if (router.query.slug === item.slug) {
            setQuizToken(item.token);
            handleGetQuiz(item.token);
            quizTokenInLocalStorage = true;
          }
        });
        if (!quizTokenInLocalStorage) {
          toast.error("You don't have access to this quiz");
        }
      } else {
        toast.error("You don't have access to this quiz");
      }
    }
  }, [router.query.slug]);

  let handleGetQuiz = async (token) => {
    let res = await getQuiz(router.query.slug, token);
    if (res.status === 200 && res.data) {
      if (res.data.questions.length !== 0) {
        setQuestions(res.data.questions);
      }
      delete res.data.questions;
      setQuiz(res.data);
    } else {
      toast.error("Unable to get the quiz");
    }
  };

  let handleCreateQuiz = async (e) => {
    e.preventDefault();
    if (title == "") {
      toast.error("Unable to create the quiz");
    } else {
      setCreatingQuiz(true);
      let res = await createQuiz(title, instructions);
      setCreatingQuiz(false);
      if (res.status === 200 && res.data) {
        router.query.slug = res.data.slug;
        router.push(router);
      } else {
        toast.error("Unable to create the quiz");
      }
    }
  };

  let handleQuestionTitle = (value) => {
    setQuestion({ ...question, title: value });
  };

  let handleQuestionOption = (value, optionIndex) => {
    let questionsTemp = { ...question };
    question.options[optionIndex].value = value;
    setQuestion(questionsTemp);
  };

  let handleCorrectOption = (value) => {
    setQuestion({ ...question, correctOption: value });
  };

  let handleAddQuestion = async (e) => {
    e.preventDefault();
    setAddingQuestion(true);
    let res = await addQuestion(quiz._id, question, quizToken);
    setAddingQuestion(false);
    if (res.status === 200 && res.data) {
      setQuestions([...questions, res.data]);
      setQuestion({
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
      });
    } else {
      toast.error(res.message);
    }
  };

  let handleDeleteQuestion = async (e, questionId, questionIndex) => {
    e.preventDefault();
    Swal.fire({
      text: `Are you sure you want to delete question ${questionIndex + 1}`,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await deleteQuestion(quiz._id, questionId, quizToken);
        if (res.status === 200) {
          let questionsTemp = [...questions];
          questionsTemp.splice(questionIndex, 1);
          setQuestions(questionsTemp);
          toast.success(`Question ${questionIndex + 1} deleted`);
          // Swal.fire({
          //   text: `Question ${questionIndex + 1} deleted`,
          //   icon: "success",
          //   timer: 2000,
          //   showConfirmButton: false,
          // });
        }
      }
    });
  };

  let handlePublishQuiz = async (e) => {
    e.preventDefault();
    Swal.fire({
      text: `Are you sure you want to publish the quiz?`,
      showCancelButton: true,
      confirmButtonText: "Publish",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await publishQuiz(quiz._id, quizToken);
        if (res.status === 200) {
          setQuestions(res.data.questions);
          delete res.data.questions;
          setQuiz(res.data);
          toast.success("Quiz published successfully");
          // Swal.fire({
          //   text: `Quiz published successfully`,
          //   icon: "success",
          //   timer: 2000,
          //   showConfirmButton: false,
          // });
        }
      }
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
          onSubmit={handleCreateQuiz}
        >
          <TitleDescription />
          {quiz._id ? (
            <div>
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
            </div>
          ) : (
            <div>
              You don't have access to this quiz. &nbsp;
              <Link href="/quiz-maker">Create a new quiz</Link>
            </div>
          )}
        </form>

        {quiz._id ? (
          <div>
            <List className={classes.root}>
              {questions.map((item, questionIndex) => {
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
                          onClick={(e) =>
                            handleDeleteQuestion(e, item._id, questionIndex)
                          }
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
                            value={item.title}
                            onChange={(e) =>
                              handleQuestionTitle(e.target.value)
                            }
                            color="primary"
                            variant="outlined"
                            disabled
                          />
                        </FormControl>
                        {item.options.map((option, optionIndex) => {
                          let correctOption =
                            item.options[optionIndex].label ===
                            item.correctOption
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
                                    optionIndex
                                  )
                                }
                                color="primary"
                                variant="outlined"
                                disabled
                                InputProps={{
                                  endAdornment: (
                                    <label className="radioContainer">
                                      <input
                                        onChange={() =>
                                          handleCorrectOption(option.label)
                                        }
                                        type="checkbox"
                                        checked={correctOption ? true : false}
                                        disabled
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
            </List>
            {quiz._id &&
            quiz.status === "published" &&
            quiz.shortenedUrl ? null : (
              <StyleRoot>
                <div className={classes.shortenedUrl} style={styles.bounce}>
                  <form
                    className={classes.question}
                    noValidate
                    autoComplete="off"
                  >
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
                        onChange={(e) => handleQuestionTitle(e.target.value)}
                        color="primary"
                        variant="outlined"
                      />
                    </FormControl>
                    {question.options.map((option, optionIndex) => {
                      let correctOption =
                        question.options[optionIndex].label ===
                        question.correctOption
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
                              handleQuestionOption(e.target.value, optionIndex)
                            }
                            color="primary"
                            variant="outlined"
                            InputProps={{
                              endAdornment: (
                                <label className="radioContainer">
                                  <input
                                    onChange={() =>
                                      handleCorrectOption(option.label)
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
                {addingQuestion ? (
                  <Loader
                    type="Puff"
                    color="#e3e2e1"
                    height={100}
                    width={100}
                  />
                ) : (
                  <Button
                    variant="outlined"
                    className={classes.addQuestionButton}
                    type="submit"
                    onClick={handleAddQuestion}
                  >
                    Add Question
                  </Button>
                )}
              </StyleRoot>
            )}
          </div>
        ) : null}
        {quiz._id && quiz.status === "published" && quiz.shortenedUrl ? (
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
                Quiz published successfully
              </Typography>
            </div>
            <div className={classes.titleInstruction}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Typography variant="body1">URL to share:</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h5">
                    {siteUrl + "/" + quiz.shortenedUrl.shortenedUrl}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </div>
        ) : quiz._id ? (
          <div>
            <div className={classes.publishContainer}>
              <div className={classes.leftSide}>
                <p>Publish the quiz to public after adding all questions</p>
                <ArrowRightAlt fontSize="medium" />
              </div>
              <Button
                variant="outlined"
                className={classes.publishButton}
                type="submit"
                onClick={handlePublishQuiz}
              >
                Publish Quiz
              </Button>
            </div>
          </div>
        ) : null}

        <Footer />
      </Container>
    </div>
  );
}
