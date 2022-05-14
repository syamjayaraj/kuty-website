const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let clickSchema = new Schema(
  {
    country: {
      type: String,
    },
    region: {
      type: String,
    },
    timezone: {
      type: String,
    },
    city: {
      type: String,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    isListed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

let Click = mongoose.model("click", clickSchema);

module.exports = Click;
