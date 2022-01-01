let models = require("../model");
const env = process.env.NODE_ENV || "development";
const config = require("../config")[env];
const jwt = require("jsonwebtoken");

let createEntry = (req) => {
  return new Promise(async (resolve, reject) => {
    let { name, phoneNumber, quizId } = req.body;

    let entry = new models.Entry();
    entry.name = name;
    entry.phoneNumber = phoneNumber;
    entry.quiz = quizId;
    entry
      .save()
      .then((entry) => {
        entry = entry.toObject();
        entry.token = jwt.sign(
          {
            _id: entry._id,
          },
          config.secret,
          {
            expiresIn: "365d",
          }
        );
        models.Quiz.findOne({
          _id: quizId,
        })
          .populate("questions")
          .then((quiz) => {
            question1 = quiz.questions[0];
            delete question1.correctOption;
            resolve({
              status: 200,
              data: entry,
              question: question1,
            });
          });
      })
      .catch((err) => {
        reject({ status: 200, message: err.message });
      });
  });
};

let updateEntry = (req) => {
  return new Promise(async (resolve, reject) => {
    let { quizId, questionId, answer } = req.body;
    try {
      models.Entry.findOne({
        _id: req.params.entryId,
      }).then((entry) => {
        entry.answers.push(answer);
        models.Question.findOne({
          _id: questionId,
        }).then((question) => {
          if (question.correctOption === answer) {
            entry.correctOption += 1;
            entry.score = entry.score + 4;
          } else {
            entry.inCorrectOption += 1;
            entry.score = entry.score - 1;
          }
          entry.save().then((entry) => {
            models.Quiz.findOne({
              _id: quizId,
            })
              .populate("questions")
              .then((quiz) => {
                quiz.questions.map((item, questionIndex) => {
                  if (item._id == questionId) {
                    if (questionIndex + 1 < quiz.questions.length) {
                      let nextQuestion = quiz.questions[questionIndex + 1];
                      delete nextQuestion.correctOption;
                      resolve({
                        status: 200,
                        data: entry,
                        question: nextQuestion,
                      });
                    } else {
                      resolve({
                        status: 200,
                        data: entry,
                      });
                    }
                  }
                });
              });
          });
        });
      });
    } catch (err) {
      reject({ status: 200, message: err.message });
    }
  });
};

module.exports = {
  createEntry,
  updateEntry,
};
