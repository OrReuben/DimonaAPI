const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create schema for todo
const HazardsSchema = new Schema(
  {
    type: {
      type: String,
      required: [true, "The text field is required"],
    },
    location: {
      type: String,
      required: [true, "The text field is required"],
    },
    date: {
      type: String,
      required: [true, "The text field is required"],
    },
    body: {
      type: String,
      required: [true, "The text field is required"],
    },
    status: {
      type: String,
      required: [true, "The text field is required"],
    },
    phone: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
      default:
        "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg",
    },
  },
  { timestamps: true }
);

const Hazard = mongoose.model("hazard", HazardsSchema);
module.exports = Hazard;
