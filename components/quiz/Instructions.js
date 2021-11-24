import { Grid } from "@material-ui/core";
import classes from "../../styles/Home.module.css";

export default function Instructions() {
  return (
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
  );
}
