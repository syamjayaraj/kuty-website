import React from "react";
import classes from "../styles/Dropdown.module.css";
import Link from "next/link";

function DropdownList() {
  return (
    <div className={classes.dropdownList}>
      <Link href="/">
        <a className={classes.dropdownItem}>URL Shortener</a>
      </Link>
      <Link href="/whatsapp-link-generator">
        <a className={classes.dropdownItem}>Whatsapp Link Generator</a>
      </Link>
      <Link href="/about">
        <a className={classes.dropdownItem}>About</a>
      </Link>
      {/* <Link href="/blog">
        <a className={classes.dropdownItem}>Blog</a>
      </Link> */}
    </div>
  );
}

export default DropdownList;
