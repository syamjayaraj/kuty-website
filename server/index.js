const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const requestIp = require("request-ip");

const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const port = process.env.PORT || 3099;
const url = require("./routes/urls");
const quiz = require("./routes/quizes");
const entry = require("./routes/entries");

const question = require("./routes/question");

const env = process.env.NODE_ENV || "development";
const config = require("./config")[env];
const dbUrl = config.dbUrl;

var options = {
  keepAlive: 1,
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbUrl, options, (err) => {
  if (err) console.log(err);
});
app.use(requestIp.mw());
app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/url", url);
app.use("/quiz", quiz);
app.use("/entry", entry);
app.use("/question", question);

app.listen(port, function () {
  console.log("Runnning on " + port);
});
module.exports = app;
