const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let urlSchema = new Schema(
  {
    type: {
      type: String,
    },
    mobileNumber: {
      type: String,
    },
    message: {
      type: String,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
    shortenedUrl: {
      type: String,
      required: true,
      unique: true,
    },
    metaData: {
      description: {
        type: String,
      },
      icon: {
        type: String,
      },
      image: {
        type: String,
      },
      keywords: {
        type: Array,
      },
      title: {
        type: String,
      },
      language: {
        type: String,
      },
      type: {
        type: String,
      },
      provider: {
        type: String,
      },
    },
    isListed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

let Url = mongoose.model("url", urlSchema);

module.exports = Url;
