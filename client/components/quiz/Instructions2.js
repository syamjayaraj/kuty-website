import { Grid } from "@material-ui/core";
import classes from "../../styles/Home.module.css";

export default function Instructions2() {
  return (
    <Grid container spacing={2} className={classes.points}>
      <Grid item xs={6} md={4} className={classes.point}>
        <div className={classes.number}>1</div>
        <div>Enter your name, Phone number and press the Start quiz button</div>
      </Grid>
      <Grid item xs={6} md={4} className={classes.point}>
        <div className={classes.number}>2</div>
        <div>Select correct option for each question</div>
      </Grid>
      <Grid item xs={6} md={4} className={classes.point}>
        <div className={classes.number}>3</div>
        <div>Your score will be published by the host</div>
      </Grid>
    </Grid>
  );
}
