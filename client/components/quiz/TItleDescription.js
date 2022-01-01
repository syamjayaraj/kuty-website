import { Typography } from "@material-ui/core";
import classes from "../../styles/Home.module.css";

export default function TitleDescription() {
  return (
    <>
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
          After you finish creating the quiz, a short link will be provided to
          share with your contestants. They can participate in the quiz by
          clicking the link.
        </p>
        <p>
          Another link and password will be provided where you can check the
          result.
        </p>
      </Typography>
    </>
  );
}
