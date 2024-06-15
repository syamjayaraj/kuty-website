import React from "react";
import { Container } from "@material-ui/core";
import classes from "../../styles/About.module.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import blogs from "../../blogs";
import renderHTML from "react-render-html";

export default function Blog(props) {
  console.log(props?.blog, "props");
  return (
    <div className={classes.root}>
      <Container component="main" className={classes.main} maxWidth="sm">
        <Header />

        <div className={classes.about}>
          <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 align-items-center my-5">
              <div className="col-lg-7">
                <img
                  className="img-fluid rounded mb-10 mb-lg-0"
                  src={props?.blog?.image}
                  style={{
                    width: "100%",
                    borderRadius: 10,
                  }}
                />
                <h1>{props?.blog?.title}</h1>
              </div>
              <div className="col-lg-5">{renderHTML(props?.blog?.content)}</div>
            </div>
          </div>
        </div>
        <Footer />
      </Container>
    </div>
  );
}

export async function getStaticProps(context) {
  const blog = blogs?.filter((item) => item?.slug === context?.params?.slug);
  return {
    props: {
      blog: blog[0],
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  if (blogs?.length !== 0) {
    const paths = blogs?.map((item) => ({
      params: { slug: item?.slug },
    }));

    return {
      paths: paths,
      fallback: true,
    };
  } else {
    return {
      paths: [],
      fallback: true,
    };
  }
}
