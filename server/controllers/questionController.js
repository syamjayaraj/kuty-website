let models = require("../model");

let getQuestionPublic = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let question = await models.Question.findOne({
        _id: req.params.questionId,
      });
      resolve({
        status: 200,
        data: question,
      });
    } catch (err) {
      reject({ status: 200, message: err.message });
    }
  });
};

let getQuestion = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let question = await models.Question.findOne({
        _id: req.params.questionId,
      });
      resolve({
        status: 200,
        data: question,
      });
    } catch (err) {
      reject({ status: 200, message: err.message });
    }
  });
};

let createQuestion = (req) => {
  return new Promise(async (resolve, reject) => {
    let { title, options, correctOption, quizId } = req.body;
    try {
      if (correctOption) {
        let question = new models.Question();
        question.title = title;
        question.options = options;
        question.correctOption = correctOption;
        question = await question.save();
        let quiz = await models.Quiz.findById(quizId);
        quiz.questions.push(question._id);
        quiz = await quiz.save();
        resolve({
          status: 200,
          data: question,
        });
      } else {
        reject({ status: 200, message: "Please select a correct option" });
      }
    } catch (err) {
      console.log(err, "err");
      reject({ status: 200, message: err.message });
    }
  });
};

let updateQuestion = (req) => {
  return new Promise(async (resolve, reject) => {
    let { title, options, correctOption } = req.body;
    try {
      let question = await models.Question.findOne({
        _id: req.params.questionId,
      });
      question.title = title;
      question.options = options;
      question.correctOption = correctOption;
      question = await question.save();
      resolve({
        status: 200,
        message: "Question updated successfully",
        data: question,
      });
    } catch (err) {
      reject({ status: 200, message: err.message });
    }
  });
};

let deleteQuestion = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let quiz = await models.Quiz.findOneAndUpdate(
        { _id: req.params.quizId },
        {
          $pull: {
            questions: { _id: req.params.questionId },
          },
        },
        {
          safe: true,
          multi: false,
        }
      );
      let question = await models.Question.findByIdAndDelete(
        req.params.questionId
      );

      resolve({
        status: 200,
        message: "Question deleted successfully",
        data: [],
      });
    } catch (err) {
      reject({ status: 200, message: err.message });
    }
  });
};

module.exports = {
  getQuestionPublic,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
