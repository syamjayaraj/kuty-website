import React from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Card,
  CardContent,
} from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { apiUrl, siteUrl } from "../../config";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import classes from "../../styles/Home.module.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeadComponent from "../../components/urlShortener/HeadComponent";
import moment from "moment";

export default function Home(props) {
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
            <a href={props?.apiResponse?.data?.url?.url}>
              {props?.apiResponse?.data?.url?.url}
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
            <ListItemText>
              <div className={classes.boldNumber}>
                {props?.apiResponse?.data?.totalClicks}
              </div>
            </ListItemText>
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
            {props?.apiResponse?.data?.clicks.map((item, index) => {
              return (
                <Card
                  sx={{ minWidth: 275 }}
                  key={"click-" + index}
                  style={{
                    margin: "2rem 1rem",
                  }}
                >
                  <CardContent>
                    <ListItem alignItems="flex-start">
                      <ListItemText>Country</ListItemText>
                      <ListItemText
                        primary={item?.country}
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
                      <ListItemText>Region</ListItemText>
                      <ListItemText
                        primary={item?.region}
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
                      <ListItemText>City</ListItemText>
                      <ListItemText
                        primary={item?.city}
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
                      <ListItemText>Timezone</ListItemText>
                      <ListItemText
                        primary={item?.timezone}
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
                      <ListItemText>Location</ListItemText>
                      <a
                        href={`https://www.latlong.net/c/?lat=${item?.location?.coordinates[1]}&long=${item?.location?.coordinates[0]}`}
                      >
                        <ListItemText
                          primary={`https://www.latlong.net/c/?lat=${item?.location?.coordinates[1]}&long=${item?.location?.coordinates[0]}`}
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
                      </a>
                    </ListItem>

                    <Typography variant="subtitle2" component="subtitle2">
                      {moment(item?.createdAt).format(
                        "MMMM Do YYYY, h:mm:ss A"
                      )}
                    </Typography>
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
  if (resJson.status === 200) {
    const paths = resJson?.data?.map((item) => ({
      params: { url: item?.shortenedUrl },
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
