const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let entrySchema = new Schema(
  {
    name: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    quiz: {
      type: Schema.Types.ObjectId,
      ref: "quiz",
    },
    answers: {
      type: Array,
    },
    correctAnswers: {
      type: Number,
      default: 0,
    },
    inCorrectAnswers: {
      type: Number,
      default: 0,
    },
    score: {
      type: Number,
      default: 0,
    },
    isListed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

let Entry = mongoose.model("entry", entrySchema);

module.exports = Entry;
