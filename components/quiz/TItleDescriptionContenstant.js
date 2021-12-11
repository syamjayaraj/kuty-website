import { Typography } from "@material-ui/core";
import classes from "../../styles/Home.module.css";

export default function TitleDescriptionContestant(props) {
  let { title, instructions } = props;
  return (
    <>
      <Typography variant="h2" component="h2" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="body1" className={classes.description}>
        {instructions}
      </Typography>
    </>
  );
}
