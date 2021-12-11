import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  FormControl,
  Button,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { fadeInDown } from "react-animations";
import { useRouter } from "next/router";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import HeadComponent from "../../components/quiz/HeadComponent";
import classes from "../../styles/Quiz.module.css";
import Footer from "../../components/Footer";
import Instructions2 from "../../components/quiz/Instructions2";
import { ToastContainer, toast } from "react-toastify";
import TitleDescriptionContestant from "../../components/quiz/TItleDescriptionContenstant";
import { getQuizPublic, startQuiz, submitAnswer } from "../../lib/quiz";
import { ArrowRightAlt, Close, CheckCircle } from "@material-ui/icons";
import Radium, { StyleRoot } from "radium";

const styles = {
  bounce: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInDown, "fadeInDown"),
  },
};

export default function Home(props) {
  const [quiz, setQuiz] = useState({
    title: "",
    instructions: "",
  });
  const [startingQuiz, setStartingQuiz] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [question, setQuestion] = useState({
    options: [],
  });
  const [entry, setEntry] = useState({});
  const [entryToken, setEntryToken] = useState("");
  const [quizCompleted, setQuizCompleted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (router.query.slug) {
      handleGetQuiz();
    }
  }, [router.query.slug]);

  let handleGetQuiz = async () => {
    let res = await getQuizPublic(router.query.slug);
    if (res.status === 200 && res.data) {
      setQuiz(res.data);
    } else {
      toast.error("Unable to get the quiz");
    }
  };

  let handleStartQuiz = async (e) => {
    setStartingQuiz(true);
    e.preventDefault();
    let res = await startQuiz(name, phoneNumber, quiz);
    if (res.status === 200 && res.question) {
      let quizesInLocalStorage = JSON.parse(localStorage.getItem("quizes"));
      if (quizesInLocalStorage && quizesInLocalStorage.length !== 0) {
        quizesInLocalStorage.map((item, index) => {
          if (item.slug === router.query.slug) {
            quizesInLocalStorage[index] = {
              ...quizesInLocalStorage[index],
              entryToken: entryToken,
            };
            localStorage.setItem(
              "quizes",
              JSON.stringify(quizesInLocalStorage)
            );
          }
        });
      }
      setEntry(res.data);
      setQuestion(res.question);
      setStartingQuiz(false);
    } else {
      toast.error("Unable to start the quiz");
    }
  };

  let handleSubmitAnswer = async (e, answer) => {
    e.preventDefault();
    let res = await submitAnswer(entry._id, quiz, question, answer, entryToken);
    if (res.status === 200) {
      if (res.question) {
        setQuestion(res.question);
      } else {
        setQuestion({ options: [] });
        setQuizCompleted(true);
      }
    } else {
      toast.error("Unable to submit the answer");
    }
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
          onSubmit={handleStartQuiz}
        >
          <TitleDescriptionContestant
            title={quiz.title}
            instructions={quiz.instructions}
          />

          <>
            <Instructions2 />
          </>

          {entry._id ? (
            <>
              <div className={classes.titleInstructionContainer}>
                {quizCompleted ? (
                  <div className={classes.successMessage}>
                    <div>
                      <CheckCircle
                        style={{
                          color: "#85c76a",
                        }}
                      />
                    </div>
                    <Typography variant="body1">Quiz completed</Typography>
                  </div>
                ) : (
                  <div className={classes.successMessage}>
                    <div>
                      <CheckCircle
                        style={{
                          color: "#85c76a",
                        }}
                      />
                    </div>
                    <Typography variant="body1">Quiz started</Typography>
                  </div>
                )}

                <div className={classes.titleInstruction}>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <Typography variant="body1">Name:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography variant="h5">{entry.name}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <Typography variant="body1">Phone number:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography variant="body1">
                        {entry.phoneNumber}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              </div>
              {quizCompleted ? null : (
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
                        <Typography variant="body1">
                          {question.title}
                        </Typography>
                      </FormControl>
                      <List
                        component="nav"
                        className={classes.root}
                        aria-label="contacts"
                      >
                        {question.options.map((option, optionIndex) => {
                          return (
                            <ListItem
                              button
                              key={optionIndex}
                              onClick={(e) =>
                                handleSubmitAnswer(e, option.label)
                              }
                            >
                              <ListItemIcon>{option.label}</ListItemIcon>
                              <ListItemText primary={option.value} />
                            </ListItem>
                          );
                        })}
                      </List>
                    </form>
                  </div>
                </StyleRoot>
              )}
            </>
          ) : (
            <>
              <div className={classes.createNew}>
                <FormControl fullWidth className={classes.messageNumberInput}>
                  <TextField
                    type="text"
                    id="outlined-name"
                    label="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    color="primary"
                    variant="outlined"
                  />
                </FormControl>

                <FormControl fullWidth className={classes.mobileNumberInput}>
                  <TextField
                    type="text"
                    id="outlined-name"
                    label="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    color="primary"
                    variant="outlined"
                  />
                </FormControl>
              </div>
              <div>
                <div className={classes.arrowContainer}>
                  {/* <ArrowDownwardIcon fontSize="medium" /> */}
                </div>
                {startingQuiz ? (
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
                    Start Quiz
                  </Button>
                )}
              </div>
            </>
          )}
        </form>

        <Footer />
      </Container>
    </div>
  );
}
