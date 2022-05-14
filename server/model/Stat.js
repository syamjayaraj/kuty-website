const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let statSchema = new Schema(
  {
    url: {
      type: Schema.Types.ObjectId,
      ref: "url",
      required: true,
      unique: true,
    },
    shortenedUrl: {
      type: String,
    },
    totalClicks: {
      type: Number,
      default: 0,
    },
    totalUniqueClicks: {
      type: Number,
      default: 0,
    },
    clicks: [{ type: Schema.Types.ObjectId, ref: "click" }],
    isListed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

let Stat = mongoose.model("stat", statSchema);

module.exports = Stat;
