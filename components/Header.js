import React from "react";
import DropdownLink from "./DropdownLink";
import Link from "next/link";
import classes from "../styles/Home.module.css";

function Footer() {
  return (
    <div>
      <Link href="/">
        <a>
          <img src="/assets/images/kuty_logo.png" className={classes.logo} />
        </a>
      </Link>

      <DropdownLink />
    </div>
  );
}
export default Footer;
