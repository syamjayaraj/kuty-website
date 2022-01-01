import { Grid } from "@material-ui/core";
import classes from "../../styles/Home.module.css";

export default function Instructions() {
  return (
    <Grid container spacing={2} className={classes.points}>
      <Grid item xs={6} md={4} className={classes.point}>
        <div className={classes.number}>1</div>
        <div>Type your Whatsapp number with country code</div>
      </Grid>
      <Grid item xs={6} md={4} className={classes.point}>
        <div className={classes.number}>2</div>
        <div>Type a message (optional)</div>
      </Grid>
      <Grid item xs={6} md={4} className={classes.point}>
        <div className={classes.number}>3</div>
        <div>You will get the shortened URL to your Whatsapp profile</div>
      </Grid>
    </Grid>
  );
}
