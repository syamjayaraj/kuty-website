const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let quizSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
    },
    shortenedUrl: {
      type: Schema.Types.ObjectId,
      ref: "url",
    },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "question",
      },
    ],
    status: {
      type: String,
      enum: ["published", "editing"],
      default: "editing",
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    correctAnswerScore: {
      type: Number,
      default: 4,
    },
    inCorrectAnswerScore: {
      type: Number,
      default: -1,
    },
  },
  { timestamps: true }
);

let Quiz = mongoose.model("quiz", quizSchema);

module.exports = Quiz;
