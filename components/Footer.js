import React from "react";
import { Container, Typography } from "@material-ui/core";
import classes from "../styles/Home.module.css";

function Footer() {
  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="body1">
          Made with Love in God's own country
        </Typography>
        <Typography variant="body1">
          Copyright © <a href="https://floyet.com">Floyet</a> 2020
        </Typography>
      </Container>
    </footer>
  );
}
export default Footer;
