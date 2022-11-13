const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const CryptoJS = require("crypto-js");

router.get("/auth", (req, res, next) => {
  User.find({})
    .then((data) => res.json(data))
    .catch(next);
});

router.post("/register", async (req, res) => {
  const userRegistered = await User.findOne({ email: req.body.email });
  if (userRegistered) {
    res.status(401).json("Email is already in use!");
  }
  const newUser = new User({
    name: req.body.name,
    img: req.body.img,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    profession: req.body.profession,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).json({
        failed: true,
        msg: "Wrong credentials!",
      });
    } else {
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      );
      const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      if (OriginalPassword !== req.body.password) {
        res.status(401).json({
          failed: true,
          msg: "Wrong credentials!",
        });
      } else {
        const { password, ...others } = user._doc;
        res.status(200).json({
          failed: false,
          user: { others },
        });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/auth/:id", (req, res, next) => {
  Hazard.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;
