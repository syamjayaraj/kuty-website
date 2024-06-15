import React from "react";
import DropdownLink from "./DropdownLink";
import Link from "next/link";
import classes from "../styles/Home.module.css";
import { useRouter } from "next/router";
function Header() {
  const router = useRouter();
  return (
    <div>
      <Link href="/">
        <a>
          <img src="/assets/images/kuty_logo.png" className={classes.logo} />
        </a>
      </Link>
      <div>
        <div className={classes.menu}>
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
          {/* <Link href="/quiz-maker">
            <a
              className={classes.dropdownItem}
              style={
                router.pathname === "/quiz-maker" ? { display: "none" } : null
              }
            >
              Quiz Maker
            </a>
          </Link> */}
        </div>
        <div className={classes.mobileMenu}>
          <DropdownLink />
        </div>
      </div>
    </div>
  );
}
export default Header;
