let models = require("../model");
var slugify = require("slugify");
let { customAlphabet } = require("nanoid");
let { shortenUrl } = require("./urlController");
const env = process.env.NODE_ENV || "development";
const config = require("../config")[env];
const siteUrl = config.siteUrl;
const jwt = require("jsonwebtoken");

let getQuizPublic = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let quiz = await models.Quiz.findOne({
        slug: req.params.slug,
        status: "published",
      }).select("-questions");

      resolve({
        status: 200,
        data: quiz,
      });
    } catch (err) {
      reject({ status: 200, message: err.message });
    }
  });
};

let getQuiz = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let quiz = await models.Quiz.findOne({
        slug: req.params.slug,
      })
        .populate("questions")
        .populate("shortenedUrl");
      resolve({
        status: 200,
        data: quiz,
      });
    } catch (err) {
      reject({ status: 200, message: err.message });
    }
  });
};

let createQuiz = (req) => {
  return new Promise(async (resolve, reject) => {
    let { title, instructions } = req.body;
    try {
      let nanoid = customAlphabet("123456789abcdefghijklmnopqrstuvwxyz", 5);
      let quiz = new models.Quiz();
      quiz.title = title;
      quiz.slug =
        slugify(title, {
          lower: true,
        }) +
        "-" +
        nanoid();
      quiz.instructions = instructions;
      quiz = await quiz.save();
      quiz = quiz.toObject();
      quiz.token = jwt.sign(
        {
          _id: quiz._id,
        },
        config.secret,
        {
          expiresIn: "365d",
        }
      );
      resolve({
        status: 200,
        data: quiz,
      });
    } catch (err) {
      reject({ status: 200, message: err.message });
    }
  });
};

let updateQuiz = (req) => {
  return new Promise(async (resolve, reject) => {
    let { title, instructions, questions } = req.body;
    try {
      let quiz = await models.Quiz.findOne({
        slug: req.params.quizId,
      });
      quiz.title = title;
      quiz.instructions = instructions;
      quiz.questions = questions;
      quiz = await quiz.save();
      resolve({
        status: 200,
        data: quiz,
      });
    } catch (err) {
      reject({ status: 200, message: err.message });
    }
  });
};

let publishQuiz = (req) => {
  return new Promise(async (resolve, reject) => {
    let { quizId } = req.body;
    try {
      models.Quiz.findOne({
        _id: quizId,
      })
        .then((quiz) => {
          if (quiz.status === "published") {
            reject({ status: 200, message: "Quiz is already published" });
          } else {
            shortenUrl({
              body: {
                url: `${siteUrl}/quiz-maker/${quiz.slug}`,
              },
            }).then(async (shortenedUrl) => {
              quiz.shortenedUrl = shortenedUrl.data._id;

              quiz.status = "published";

              quiz.save().then((quizTemp) => {
                models.Quiz.findOne({ _id: quiz._id })
                  .populate("questions")
                  .populate("shortenedUrl")
                  .then((quiz) => {
                    resolve({
                      status: 200,
                      data: quiz,
                    });
                  });
              });
            });
          }
        })
        .catch((err) => {
          reject({ status: 200, message: err.message });
        });
    } catch (err) {
      console.log(err, "error");
      reject({ status: 200, message: err.message });
    }
  });
};

module.exports = {
  getQuizPublic,
  getQuiz,
  createQuiz,
  updateQuiz,
  publishQuiz,
};
