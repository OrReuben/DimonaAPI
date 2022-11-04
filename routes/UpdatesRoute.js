const express = require("express");
const router = express.Router();
const Update = require("../models/updatesModel");

router.get("/updates", (req, res, next) => {
  Update.find({})
    .then((data) => res.json(data))
    .catch(next);
});

router.post("/updates", async (req, res, next) => {
  const newUpdate = new Update(req.body);
  
  try {
    await newUpdate.save();
    const sortedUpdate = await Update.find().sort({$natural:-1});
    res.status(200).json(sortedUpdate);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/update/:id", (req, res, next) => {
  Update.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});
module.exports = router;
