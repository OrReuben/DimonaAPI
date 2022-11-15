const express = require("express");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/protect");
const router = express.Router();
const Hazard = require("../models/hazardModel");

router.get("/hazards", verifyToken, (req, res, next) => {
  Hazard.find({})
    .sort({ _id: -1 })
    .then((data) => res.json(data))
    .catch(next);
});

router.get("/hazards/:id", verifyTokenAndAuthorization, (req, res, next) => {
  Hazard.find({ _uid: req.params.id })
    .sort({ _id: -1 })
    .then((data) => res.json(data))
    .catch(next);
});

router.get("/weekly/hazards", verifyToken, (req, res, next) => {
  Hazard.find({
    timestamp: {
      $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
    },
  })
    .sort({ _id: -1 })
    .then((data) => res.json(data))
    .catch(next);
});

router.get("/hazardsDone", verifyToken, (req, res, next) => {
  Hazard.find({ status: "בוצע" })
    .then((data) => res.json(data))
    .catch(next);
});

router.get("/allHazardsNotDone", verifyToken, (req, res, next) => {
  Hazard.find({ status: "לא בוצע" })
    .then((data) => res.json(data))
    .catch(next);
});

router.get("/hazardsNotDone/:profession", verifyToken, (req, res, next) => {
  Hazard.find({ status: "לא בוצע", profession: req.params.profession })
    .then((data) => res.json(data))
    .catch(next);
});

router.get("/hazardsPending", verifyToken, (req, res, next) => {
  Hazard.find({ status: "בביצוע" })
    .then((data) => res.json(data))
    .catch(next);
});

router.get(
  "/onGoingHazards/:id",
  verifyTokenAndAuthorization,
  (req, res, next) => {
    Hazard.find({ status: "בביצוע", _wid: req.params.id })
      .then((data) => res.json(data))
      .catch(next);
  }
);

router.get("/hazardPercentage", async (req, res) => {
  try {
    const doneHazards = await Hazard.find({
      status: "בוצע",
      timestamp: {
        $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
      },
    });
    const notDoneHazards = await Hazard.find({
      status: "לא בוצע",
      timestamp: {
        $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
      },
    });
    const onGoingHazards = await Hazard.find({
      status: "בביצוע",
      timestamp: {
        $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
      },
    });
    const weeklyHazards = await Hazard.find({
      timestamp: {
        $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
      },
    });
    res.status(200).json({
      doneHazards: doneHazards.length,
      notDoneHazards: notDoneHazards.length,
      onGoingHazards: onGoingHazards.length,
      weeklyHazards: weeklyHazards.length,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// Remove this whenever theres an active post route at the other website
router.post("/hazards", verifyToken, (req, res, next) => {
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

router.delete("/hazards/:id", verifyTokenAndAdmin, (req, res, next) => {
  Hazard.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

router.put("/hazards/:id", verifyToken, async (req, res) => {
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
