import { Typography } from "@material-ui/core";
import classes from "../../styles/Home.module.css";

export default function TitleDescription() {
  return (
    <>
      <Typography variant="h2" component="h2" className={classes.title}>
        Whatsapp Link Generator
      </Typography>
      <Typography variant="body1" className={classes.description}>
        <a href="https://kuty.me/whatsapp-link-generator" target="_blank">
          Kuty.me Whatsapp Link Generator
        </a>{" "}
        will help you to create a short link to your WhatsApp profile. Anyone
        who clicks the link will direct them to your WhatsApp profile. So that
        they can easily contact you via Whatsapp.
      </Typography>
    </>
  );
}
