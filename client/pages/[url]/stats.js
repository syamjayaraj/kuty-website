import React, { useState } from "react";
import {
  Container,
  TextField,
  FormControl,
  Button,
  InputAdornment,
  InputLabel,
  Input,
  IconButton,
  FormHelperText,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  CommentIcon,
  ListItemAvatar,
  Avatar,
  Divider,
  Card,
  CardContent,
} from "@material-ui/core";

import isURL from "validator/lib/isURL";

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { apiUrl, siteUrl } from "../../config";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { fadeInDown } from "react-animations";
import Radium from "radium";
import classes from "../../styles/Home.module.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeadComponent from "../../components/urlShortener/HeadComponent";

export default function Home(props) {
  console.log(props, "props");

  return (
    <div className={classes.root}>
      <HeadComponent />
      <Container component="main" className={classes.main} maxWidth="sm">
        <Header />
        <Typography variant="h2" component="h2" className={classes.title}>
          STATS
        </Typography>
        <div className={classes.lightBlock}>
          <Typography
            variant="body2"
            color="text.primary"
            className={classes.url}
          >
            Original URL:{" "}
            <a href={siteUrl + "/" + props?.apiResponse?.data?.url?.url}>
              {siteUrl + "/" + props?.apiResponse?.data?.url?.url}
            </a>
          </Typography>

          <div className={classes.arrowContainer}>
            <ArrowDownwardIcon fontSize="medium" />
          </div>

          <Typography
            variant="body2"
            color="text.primary"
            className={classes.url}
          >
            Shortend URL:{" "}
            <a
              href={siteUrl + "/" + props?.apiResponse?.data?.url?.shortenedUrl}
            >
              {siteUrl + "/" + props?.apiResponse?.data?.url?.shortenedUrl}
            </a>
          </Typography>
        </div>

        <Typography variant="h6" component="h6">
          GENERAL
        </Typography>

        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <div className={classes.boldNumber}>
                {props?.apiResponse?.data?.totalClicks}
              </div>
            </ListItemAvatar>
            <ListItemText
              primary="Clicks"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  ></Typography>
                  Number of clicks on the shortened URL
                </React.Fragment>
              }
            />
          </ListItem>

          <Divider variant="inset" component="li" />
        </List>

        {props?.apiResponse?.data?.clicks?.length !== 0 && (
          <>
            <Typography variant="h6" component="h6" style={{ margin: "1rem" }}>
              CLICK DETAILS
            </Typography>
            {props?.apiResponse?.data?.clicks.map((item) => {
              return (
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>Country</ListItemAvatar>
                      <ListItemText
                        primary={item.country}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            ></Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>

                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>Region</ListItemAvatar>
                      <ListItemText
                        primary={item.region}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            ></Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>

                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>City</ListItemAvatar>
                      <ListItemText
                        primary={item.city}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            ></Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>

                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>Timezone</ListItemAvatar>
                      <ListItemText
                        primary={item.timezone}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            ></Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>

                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>Location</ListItemAvatar>
                      <ListItemText
                        primary={`https://www.latlong.net/c/?lat=${item?.location[1]}&long=${item?.location[0]}`}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            ></Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  </CardContent>
                </Card>
              );
            })}
          </>
        )}

        <Footer />
      </Container>
    </div>
  );
}

export async function getStaticProps(context) {
  let url = `${apiUrl}/url/stats`;
  let requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      shortenedUrl: context?.params?.url,
    }),
  };

  const res = await fetch(url, requestOptions);
  const resJson = await res.json();

  return {
    props: {
      apiResponse: resJson,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  let url = `${apiUrl}/url/get-short-urls`;
  let requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(url, requestOptions);
  const resJson = await res.json();
  console.log(resJson, "lorem");
  if (resJson.status === 200) {
    const paths = resJson?.data?.map((item) => ({
      params: { url: item.shortenedUrl },
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
