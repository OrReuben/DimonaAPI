const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create schema for todo
const HazardsSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    img: {
      type: Array,
      default:
        "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg",
    },
  },
  { timestamps: true }
);

const Hazard = mongoose.model("hazard", HazardsSchema);
module.exports = Hazard;
