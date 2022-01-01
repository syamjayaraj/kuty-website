const express = require("express");
const router = express.Router();
let {
  getQuestionPublic,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");
const { jwtauth } = require("../lib/jwtlib");

router.get("/:questionId/public", [jwtauth], async (req, res) => {
  try {
    let response = await getQuestionPublic(req);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.get("/:questionId", [jwtauth], async (req, res) => {
  try {
    let response = await getQuestion(req);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.post("/", [jwtauth], async (req, res) => {
  try {
    let response = await createQuestion(req);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.put("/:quizId/:questionId", [jwtauth], async (req, res) => {
  try {
    let response = await updateQuestion(req);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.delete("/:quizId/:questionId", [jwtauth], async (req, res) => {
  try {
    let response = await deleteQuestion(req);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

module.exports = router;
