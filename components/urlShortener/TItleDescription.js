import { Typography } from "@material-ui/core";
import classes from "../../styles/Home.module.css";

export default function TitleDescription() {
  return (
    <>
      <Typography variant="h2" component="h2" className={classes.title}>
        The Simplest URL Shortener
      </Typography>
      <Typography variant="body1" className={classes.description}>
        People don't like long and messy URLs.{" "}
        <a href="https://kuty.me" target="_blank">
          Kuty.me
        </a>{" "}
        will help you to shorten any lengthy URL in just one click.
      </Typography>
    </>
  );
}
