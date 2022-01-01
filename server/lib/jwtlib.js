const jwt = require("jsonwebtoken");
const models = require("../model");
const env = process.env.NODE_ENV || "development";
const config = require("../config")[env];
const _ = require("lodash");

let verifyToken = (token, next) => {
  try {
    var decoded = jwt.verify(token, config.secret);
    return { ...decoded, expired: false };
  } catch (err) {
    if (err) {
      if (err.name === "TokenExpiredError") {
        var decoded = jwt.decode(token);
        if (decoded) {
          return { ...decoded, expired: true };
        } else return false;
      } else return false;
    }
  }
};

let tokenValidation = async (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (token) {
    req.token = token;
    try {
      const decodedToken = verifyToken(req.token, next);
      console.log(decodedToken);
      if (!decodedToken) {
        res.status(400).json({
          status: 400,
          message: "Quiz does not have  token",
        });
      } else if (decodedToken.expired) {
        let decoded = jwt.decode(token);

        let quiz = await models.Quiz.findOne({
          _id: decoded._id,
        });

        quiz.token = jwt.sign(
          {
            id: quiz._id,
          },
          config.secret,
          {
            expiresIn: "20s",
          }
        );
        req.quiz = quiz;
        next();
      } else {
        let quiz = await models.Quiz.findOne({
          _id: decodedToken._id,
        });
        quiz.token = req.token;
        req.quiz = quiz;
        next();
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({
        status: 400,
        message: "Error with your token",
      });
    }
  } else {
    res.status(400).json({
      status: 400,
      message: "Quiz does not have  token",
    });
  }
};

let tokenValidationEntry = async (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (token) {
    req.token = token;
    try {
      const decodedToken = verifyToken(req.token, next);
      if (!decodedToken) {
        res.status(400).json({
          status: 400,
          message: "Entry does not have  token",
        });
      } else if (decodedToken.expired) {
        let decoded = jwt.decode(token);

        let entry = await models.Entry.findOne({
          _id: decoded._id,
        });

        entry.token = jwt.sign(
          {
            id: entry._id,
          },
          config.secret,
          {
            expiresIn: "20s",
          }
        );
        req.entry = entry;
        next();
      } else {
        let entry = await models.Entry.findOne({
          _id: decodedToken._id,
        });
        entry.token = req.token;
        req.entry = entry;
        next();
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({
        status: 400,
        message: "Error with your token",
      });
    }
  } else {
    res.status(400).json({
      status: 400,
      message: "Entry does not have  token",
    });
  }
};

module.exports.jwtauth = tokenValidation;
module.exports.jwtAuthEntry = tokenValidationEntry;
