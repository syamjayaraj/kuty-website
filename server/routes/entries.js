const express = require("express");
const router = express.Router();
let { createEntry, updateEntry } = require("../controllers/entryController");
const { jwtAuthEntry } = require("../lib/jwtlib");

router.post("/", async (req, res) => {
  try {
    let response = await createEntry(req);
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

router.put("/:entryId", [jwtAuthEntry], async (req, res) => {
  try {
    let response = await updateEntry(req);
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
