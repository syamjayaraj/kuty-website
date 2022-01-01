const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let questionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    options: [],
    correctOption: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

let Question = mongoose.model("question", questionSchema);

module.exports = Question;
