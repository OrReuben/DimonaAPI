const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create schema for todo
const HazardsSchema = new Schema(
  {
    profession: {
      type: String,
      required: true,
    },
    location: {
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
    _uid: {
      type: String,
      required: true,
    },
    _wid: {
      type: String,
    },
    img: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Hazard = mongoose.model("hazard", HazardsSchema);
module.exports = Hazard;
