const express = require("express");
const mongoose = require("mongoose");
const Profile = require("../../models/Profile");
const passport = require("passport");
const User = require("../../models/User");
const router = express.Router();

const validateProfileInput = require("../../validation/profiles");
const ValidateExperienceInput = require("../../validation/experience");
const ValidateEducationInput = require("../../validation/education");

router.get("/test", (req, res) => res.json({ msg: "connected to Profiles" }));

// Get Profiles with params 
// using handle,userId,all profiles

router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "There is no profie connected to this handle";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
  .populate('user',["name","avatar"])
  .then(profiles => {
    if(!profiles){
      errors.noprofile = "This user has no profiles connected to him";
      return res.status(404).json(errors);
    }
    res.json(profiles)''
  })

})

router.get("/user/:user_id",(req, res) {
  const errors = {};
  Profile.findOne({user: req.params.user_id})
    .populate('user',['name','avatar'])
    .then(profile => {
      if(!profile){
        errors.noProfile = 'This user has no profile';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
})

// root get call for profile

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
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

//POST call for updating or creating a profile

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(404).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // Skills - Spilt into array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
<<<<<<< HEAD

=======
>>>>>>> develop
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
<<<<<<< HEAD
        Profile.findOne({ handle: req.user.profileFields.handle }).then(
          profile => {
            if (profile) {
              errors.handle = "This handle already exists";
              res.status(404).json(errors);
            }
            new Profile(profileFields)
              .save()
              .then(profile => res.json(profile));
          }
        );
=======
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "This handle already exists";
            res.status(404).json(errors);
          }
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
>>>>>>> develop
      }
    });
  }
);

module.exports = router;
