import React from "react";
import { Container } from "@material-ui/core";
import classes from "../../styles/About.module.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeadComponent from "../../components/about/HeadComponent";
import Link from "next/link";
import blogs from "../../blogs";

export default function Blog(props) {
  return (
    <div className={classes.root}>
      {/* <HeadComponent /> */}

      <Container component="main" className={classes.main} maxWidth="sm">
        <Header />

        <div className={classes.about}>
          <h1>Blog</h1>
          <div className="container px-4 px-lg-5">
            {props?.blogs?.map((item, index) => {
              console.log(item.image, "item");
              return (
                <>
                  <Link href={`/blog/${item?.slug}`} key={"blog" + index}>
                    <a
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <div className="row gx-4 gx-lg-5 align-items-center my-5">
                        <div className="col-lg-7">
                          <img
                            className="img-fluid rounded mb-10 mb-lg-0"
                            src={item?.image}
                            style={{
                              width: "100%",
                              borderRadius: 10,
                            }}
                          />
                        </div>
                        <div className="col-lg-5">
                          <h2 className="font-weight-light">{item?.title}</h2>
                          <p>{item?.description}</p>
                        </div>
                      </div>
                    </a>
                  </Link>
                  <hr
                    style={{
                      margin: "1rem 0rem",
                      border: "0.1px solid #dfe1e7",
                    }}
                  />
                </>
              );
            })}
          </div>
        </div>
        <Footer />
      </Container>
    </div>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      blogs: blogs,
    },
    revalidate: 1,
  };
}
