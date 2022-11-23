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
    createdAt: {
      $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
    },
  })
    .sort({ _id: -1 })
    .then((data) => res.send(data))
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

router.get("/hazardstats", verifyToken, async (req, res, next) => {
  try {
    const sevenDaysAgo = await Hazard.find({
      createdAt: {
        $lte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
        $gte: new Date(new Date() - 8 * 60 * 60 * 24 * 1000),
      },
    });
    const sixDaysAgo = await Hazard.find({
      createdAt: {
        $lte: new Date(new Date() - 6 * 60 * 60 * 24 * 1000),
        $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
      },
    });
    const fiveDaysAgo = await Hazard.find({
      createdAt: {
        $lte: new Date(new Date() - 5 * 60 * 60 * 24 * 1000),
        $gte: new Date(new Date() - 6 * 60 * 60 * 24 * 1000),
      },
    });
    const fourDaysAgo = await Hazard.find({
      createdAt: {
        $lte: new Date(new Date() - 4 * 60 * 60 * 24 * 1000),
        $gte: new Date(new Date() - 5 * 60 * 60 * 24 * 1000),
      },
    });
    const threeDaysAgo = await Hazard.find({
      createdAt: {
        $lte: new Date(new Date() - 3 * 60 * 60 * 24 * 1000),
        $gte: new Date(new Date() - 4 * 60 * 60 * 24 * 1000),
      },
    });
    const twoDaysAgo = await Hazard.find({
      createdAt: {
        $lte: new Date(new Date() - 2 * 60 * 60 * 24 * 1000),
        $gte: new Date(new Date() - 3 * 60 * 60 * 24 * 1000),
      },
    });
    const oneDaysAgo = await Hazard.find({
      createdAt: {
        $lte: new Date(new Date() - 1 * 60 * 60 * 24 * 1000),
        $gte: new Date(new Date() - 2 * 60 * 60 * 24 * 1000),
      },
    });
    const today = await Hazard.find({
      createdAt: {
        $lte: new Date(),
        $gte: new Date(new Date() - 1 * 60 * 60 * 24 * 1000),
      },
    });
    res.status(200).json({
      sevenDaysAgo: sevenDaysAgo.length,
      sixDaysAgo: sixDaysAgo.length,
      fiveDaysAgo: fiveDaysAgo.length,
      fourDaysAgo: fourDaysAgo.length,
      threeDaysAgo: threeDaysAgo.length,
      twoDaysAgo: twoDaysAgo.length,
      oneDaysAgo: oneDaysAgo.length,
      today: today.length,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/hazardPercentage", async (req, res) => {
  try {
    const doneHazards = await Hazard.find({
      status: "בוצע",
      createdAt: {
        $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
      },
    });
    const notDoneHazards = await Hazard.find({
      status: "לא בוצע",
      createdAt: {
        $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
      },
    });
    const onGoingHazards = await Hazard.find({
      status: "בביצוע",
      createdAt: {
        $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
      },
    });
    const weeklyHazards = await Hazard.find({
      createdAt: {
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

router.post("/hazards/:id", verifyTokenAndAuthorization, (req, res, next) => {
  if (req.body.location) {
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
