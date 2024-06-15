import React from "react";
import { Container, Typography } from "@material-ui/core";
import classes from "../styles/Home.module.css";
import Link from "next/link";
function Footer() {
  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="body1">
          Carefully Handcrafted in INDIA | Powered by{" "}
          <a href="https://floyet.com">FLOYET</a>
        </Typography>
        <Typography variant="body1">
          Copyright © <a href="https://kuty.me">KUTY.ME</a> 2024 |&nbsp;
          <Link href="/about">
            <a>About</a>
          </Link>
          &nbsp;|&nbsp;
          <Link href="/blog">
            <a>Blog</a>
          </Link>
        </Typography>
      </Container>
    </footer>
  );
}
export default Footer;
