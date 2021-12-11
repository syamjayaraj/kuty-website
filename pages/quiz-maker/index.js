import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Container,
  TextField,
  FormControl,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";
import { useRouter } from "next/router";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import HeadComponent from "../../components/quiz/HeadComponent";
import classes from "../../styles/Quiz.module.css";
import Footer from "../../components/Footer";
import Instructions1 from "../../components/quiz/Instructions1";
import { ToastContainer, toast } from "react-toastify";
import TitleDescription from "../../components/quiz/TItleDescription";
import { createQuiz } from "../../lib/quiz";
import Header from "../../components/Header";

export default function Home(props) {
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [creatingQuiz, setCreatingQuiz] = useState(false);
  const [quizesCreated, setQuizesCreated] = useState([]);
  const router = useRouter();

  useEffect(() => {
    handleGetQuiz();
  }, [router.query.slug]);

  let handleGetQuiz = async () => {
    let quizesInLocalStorage = JSON.parse(localStorage.getItem("quizes"));
    if (quizesInLocalStorage && quizesInLocalStorage.length !== 0) {
      setQuizesCreated(quizesInLocalStorage);
    }
  };

  let handleCreateQuiz = async (e) => {
    e.preventDefault();
    if (title == "") {
      toast.error("Title in required");
    } else {
      setCreatingQuiz(true);
      let res = await createQuiz(title, instructions);
      setCreatingQuiz(false);
      if (res.status === 200 && res.data) {
        let quizesInLocalStorage = JSON.parse(localStorage.getItem("quizes"));
        if (quizesInLocalStorage && quizesInLocalStorage.length !== 0) {
          let tempQuizesInLocalStorage = [
            ...quizesInLocalStorage,
            {
              token: res.data.token,
              _id: res.data._id,
              title: res.data.title,
              instructions: res.data.instructions,
              slug: res.data.slug,
            },
          ];
          localStorage.setItem(
            "quizes",
            JSON.stringify(tempQuizesInLocalStorage)
          );
        } else {
          localStorage.setItem(
            "quizes",
            JSON.stringify([
              {
                token: res.data.token,
                _id: res.data._id,
                title: res.data.title,
                instructions: res.data.instructions,
                slug: res.data.slug,
              },
            ])
          );
        }
        router.push(`/quiz-maker/create/${res.data.slug}`);
      } else {
        toast.error("Unable to create the quiz");
      }
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
        <Header />
        <HeadComponent />
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={handleCreateQuiz}
        >
          <TitleDescription />
          {quizesCreated.length === 0 ? <Instructions1 /> : null}

          {quizesCreated.length !== 0 ? (
            <div className={classes.quizesCreated}>
              <Typography
                variant="h6"
                component="h6"
                className={classes.quizCreatedTitle}
              >
                Quizes you have created
              </Typography>

              <Grid container spacing={2}>
                {quizesCreated.map((item) => {
                  return (
                    <Grid item xs={6}>
                      <Link href={`/quiz-maker/create/${item.slug}`}>
                        <a>
                          <div className={classes.card}>
                            <Typography
                              variant="h6"
                              component="h6"
                              className={classes.cardTitle}
                            >
                              {item.title}
                            </Typography>
                            <Typography
                              variant="body1"
                              className={classes.cardInstruction}
                            >
                              {item.instructions}
                            </Typography>
                          </div>
                        </a>
                      </Link>
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          ) : null}

          <div className={classes.createNew}>
            <Typography
              variant="h6"
              component="h6"
              className={classes.createNewTitle}
            >
              Create new quiz
            </Typography>
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

          <div>
            <div className={classes.arrowContainer}>
              <ArrowDownwardIcon fontSize="medium" />
            </div>
            {creatingQuiz ? (
              <div className={classes.loaderContainer}>
                <Loader type="Puff" color="#e3e2e1" height={100} width={100} />
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
        </form>

        <Footer />
      </Container>
    </div>
  );
}
