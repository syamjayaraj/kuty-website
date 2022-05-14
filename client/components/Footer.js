import React from "react";
import { Container, Typography } from "@material-ui/core";
import classes from "../styles/Home.module.css";
import Link from "next/link";
function Footer() {
  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="body1">
          Made with Love in God's own country
        </Typography>
        <Typography variant="body1">
          Copyright © <a href="https://floyet.com">Floyet</a> 2020 |&nbsp;
          <Link href="/about">
            <a>About</a>
          </Link>
          &nbsp;|&nbsp;
          <Link href="/blog">
            <a>Blog</a>
          </Link>
        </Typography>
        <div className={classes.downloadApp}>
          Download Kuty.me mobile app for FREE
          <div className={classes.storeIcons}>
            <img src="/assets/icons/play-store.png" className={classes.icon} />
            <img src="/assets/icons/app-store.png" className={classes.icon} />
          </div>
        </div>
      </Container>
    </footer>
  );
}
export default Footer;
