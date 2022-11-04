const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UpdatesModel = new Schema(
  {
    img: {
      type: String,
    },
    name: {
      type: String,
    },
    problem: {
      type: String,
      required: [true],
    },
    where: {
      type: String,
      required: [true],
    },
    noti: {
      type: String,
    },
    time: {
      type: String,
    },
  },
  { timestamps: true }
);

const Update = mongoose.model("Update", UpdatesModel);
module.exports = Update;
