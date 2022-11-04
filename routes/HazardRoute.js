const express = require("express");
const router = express.Router();
const Hazard = require("../models/hazardModel");

router.get("/hazards", (req, res, next) => {
  Hazard.find({})
    .then((data) => res.json(data))
    .catch(next);
});

router.get("/weekly/hazards", (req, res, next) => {
  Hazard.find({
    timestamp: {
      $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
    },
  })
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

module.exports = router;
