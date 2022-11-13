const express = require("express");
const router = express.Router();
const Hazard = require("../models/hazardModel");

router.get("/hazards", (req, res, next) => {
  Hazard.find({})
    .sort({ _id: -1 })
    .then((data) => res.json(data))
    .catch(next);
});

router.get("/hazards/:id", (req, res, next) => {
  Hazard.find({ _uid: req.params.id })
    .sort({ _id: -1 })
    .then((data) => res.json(data))
    .catch(next);
});

router.get("/hazards/find/:profession", (req, res, next) => {
  Hazard.find({ profession: req.params.profession })
    .sort({ _id: -1 })
    .then((data) => res.json(data))
    .catch(next);
});

router.get("/weekly/hazards", (req, res, next) => {
  Hazard.find({
    timestamp: {
      $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
    },
  })
    .sort({ _id: -1 })
    .then((data) => res.json(data))
    .catch(next);
});

router.get("/hazardsDone", (req, res, next) => {
  Hazard.find({ status: "בוצע" })
    .then((data) => res.json(data))
    .catch(next);
});

router.get("/hazardsNotDone", (req, res, next) => {
  Hazard.find({ status: "לא בוצע" })
    .then((data) => res.json(data))
    .catch(next);
});

router.get("/hazardsPending", (req, res, next) => {
  Hazard.find({ status: "בביצוע" })
    .then((data) => res.json(data))
    .catch(next);
});

router.get("/onGoingHazards/:wid", (req, res, next) => {
  Hazard.find({ status: "בביצוע", _wid: req.params.wid })
    .then((data) => res.json(data))
    .catch(next);
});

router.post("/hazards", (req, res, next) => {
  if (req.body.type && req.body.location && req.body.date) {
    Hazard.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: "The input field is empty",
    });
  }
});

router.delete("/hazards/:id", (req, res, next) => {
  Hazard.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

router.put("/hazards/:id", async (req, res) => {
  try {
    const updatedHazard = await Hazard.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHazard);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
