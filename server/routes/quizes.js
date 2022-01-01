const express = require("express");
const router = express.Router();
let {
  getQuizPublic,
  getQuiz,
  createQuiz,
  updateQuiz,
  publishQuiz,
} = require("../controllers/quizController");
const { jwtauth } = require("../lib/jwtlib");

router.get("/:slug/public", async (req, res) => {
  try {
    let response = await getQuizPublic(req);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.get("/:slug", [jwtauth], async (req, res) => {
  try {
    let response = await getQuiz(req);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    let response = await createQuiz(req);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.put("/:quizId", [jwtauth], async (req, res) => {
  try {
    let response = await updateQuiz(req);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.post("/publish", [jwtauth], async (req, res) => {
  try {
    let response = await publishQuiz(req);
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
