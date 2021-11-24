import classes from "../styles/BlogHeader.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import DropdownLink from "./DropdownLink";

export default function BlogHeader() {
  const router = useRouter();

  return (
    <div className={classes.blogHeader}>
      <div>
        <Link href="/">
          <a>
            <img src="/assets/images/kuty_logo.png" className={classes.logo} />
          </a>
        </Link>
        <Link href="/blog">
          <h1 className={classes.title}>Blog</h1>
        </Link>
      </div>
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
          <Link href="/quiz-maker">
            <a
              className={classes.dropdownItem}
              style={
                router.pathname === "/quiz-maker" ? { display: "none" } : null
              }
            >
              Quiz Maker
            </a>
          </Link>
        </div>
        <div className={classes.mobileMenu}>
          <DropdownLink />
        </div>
      </div>
    </div>
  );
}
