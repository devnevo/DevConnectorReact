const express = require("express");
const mongoose = require("mongoose");
const Profile = require("../../models/Profile");
const passport = require("passport");
const User = require("../../models/User");
const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "connected to Profiles" }));

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noProfile = "User profile does not exist";
          return res.status(400).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
