const express = require("express");
const router = express.Router();
const Update = require("../models/updatesModel");

router.get("/updates", (req, res, next) => {
  Update.find().sort({_id:-1})
    .then((data) => res.json(data))
    .catch(next);
});

router.post("/updates", async (req, res, next) => {
  const newUpdate = new Update(req.body);
  
  try {
    const savedUpdate = await newUpdate.save();
    res.status(200).json(savedUpdate);
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
