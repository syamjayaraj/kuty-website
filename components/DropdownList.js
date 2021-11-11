import React from "react";
import classes from "../styles/Dropdown.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
function DropdownList() {
  const router = useRouter();
  return (
    <div className={classes.dropdownList}>
      <Link href="/">
        <a
          className={classes.dropdownItem}
          style={router.pathname === "/" ? { display: "none" } : null}
        >
          URL Shortener
        </a>
      </Link>
      <Link href="/whatsapp-link-generator">
        <a
          className={classes.dropdownItem}
          style={
            router.pathname === "/whatsapp-link-generator"
              ? { display: "none" }
              : null
          }
        >
          Whatsapp Link Generator
        </a>
      </Link>
      <Link href="/about">
        <a
          className={classes.dropdownItem}
          style={router.pathname === "/about" ? { display: "none" } : null}
        >
          About
        </a>
      </Link>
      {/* <Link href="/blog">
        <a className={classes.dropdownItem}>Blog</a>
      </Link> */}
    </div>
  );
}

export default DropdownList;
