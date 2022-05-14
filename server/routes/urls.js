const express = require("express");
const router = express.Router();
let {
  shortenUrl,
  shortenUrlWhatsapp,
  getUrl,
  getStats,
  getShortUrls,
} = require("../controllers/urlController");

router.post("/shorten", async (req, res) => {
  try {
    let response = await shortenUrl(req);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.post("/shorten/whatsapp", async (req, res) => {
  try {
    let response = await shortenUrlWhatsapp(req);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.post("/get-url", async (req, res) => {
  try {
    let response = await getUrl(req);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.post("/stats", async (req, res) => {
  try {
    let response = await getStats(req);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.post("/get-short-urls", async (req, res) => {
  try {
    let response = await getShortUrls(req);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

module.exports = router;
