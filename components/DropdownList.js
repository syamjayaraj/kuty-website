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
      <Link href="/quiz-maker">
        <a
          className={classes.dropdownItem}
          style={router.pathname === "/quiz-maker" ? { display: "none" } : null}
        >
          Quiz Maker
        </a>
      </Link>
    </div>
  );
}

export default DropdownList;
