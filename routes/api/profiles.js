const express = require("express");
const mongoose = require("mongoose");
const Profile = require("../../models/Profile");
const passport = require("passport");
const User = require("../../models/User");
const router = express.Router();

const validateProfileInput = require("../../validation/profiles");
const ValidateExperienceInput = require("../../validation/experience");
const ValidateEducationInput = require("../../validation/education");

<<<<<<< HEAD
<<<<<<< HEAD
// Get Profiles with params
=======
router.get("/test", (req, res) => res.json({ msg: "connected to Profiles" }));

// Get Profiles with params 
>>>>>>> 90bf76297c61a7bdd143e664c671fea10a38a393
=======
// Get Profiles with params
>>>>>>> origin/develop
// using handle,userId,all profiles

router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
<<<<<<< HEAD
<<<<<<< HEAD
        errors.noprofile = "There is no profie connected to this handle";
=======
        errors.noProfile = "There is no profie connected to this handle";
>>>>>>> 90bf76297c61a7bdd143e664c671fea10a38a393
=======
        errors.noprofile = "There is no profie connected to this handle";
>>>>>>> origin/develop
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/develop
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "This user has no profiles connected to him";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    });
});
<<<<<<< HEAD

router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "This user has no profile";
=======
  .populate('user',["name","avatar"])
  .then(profiles => {
    if(!profiles){
      errors.noprofile = "This user has no profiles connected to him";
      return res.status(404).json(errors);
    }
    res.json(profiles)''
  })

})
=======
>>>>>>> origin/develop

router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
<<<<<<< HEAD
      if(!profile){
        errors.noProfile = 'This user has no profile';
>>>>>>> 90bf76297c61a7bdd143e664c671fea10a38a393
=======
      if (!profile) {
        errors.noprofile = "This user has no profile";
>>>>>>> origin/develop
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
<<<<<<< HEAD
<<<<<<< HEAD
});
=======
})
>>>>>>> 90bf76297c61a7bdd143e664c671fea10a38a393
=======
});
>>>>>>> origin/develop

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
<<<<<<< HEAD
<<<<<<< HEAD
          errors.noprofile = "User profile does not exist";
=======
          errors.noProfile = "User profile does not exist";
>>>>>>> 90bf76297c61a7bdd143e664c671fea10a38a393
=======
          errors.noprofile = "User profile does not exist";
>>>>>>> origin/develop
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
<<<<<<< HEAD

=======
>>>>>>> develop
>>>>>>> 90bf76297c61a7bdd143e664c671fea10a38a393
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
<<<<<<< HEAD
=======
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
>>>>>>> 90bf76297c61a7bdd143e664c671fea10a38a393
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "This handle already exists";
            res.status(404).json(errors);
          }
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
<<<<<<< HEAD
=======
>>>>>>> develop
>>>>>>> 90bf76297c61a7bdd143e664c671fea10a38a393
      }
    });
  }
);

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/develop
//Adding Experience to a profile
//POST call
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = ValidateExperienceInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.body.id })
      .then(profile => {
        const newExp = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };

        profile.experience.unshift(newExp);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.json(err));
  }
);

// Post call for adding Education to profile
//POST call

router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = ValidateEducationInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      profile.education.unshift(newEdu);
      profile.save().then(profile => res.json(profile));
    });
  }
);

//DELETE API'S for PROFILE

//Delete a field in Education
//POST call

router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }, (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      var indexToBeRemoved = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);

      profile.education.splice(indexToBeRemoved, 1);
      profile.save().then(profile => res.json(profile));
    });
  })
);

//Delete a field in Experience
//POST call

router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }, (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      var indexToBeRemoved = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

      profile.experience.splice(indexToBeRemoved, 1);
      profile.save().then(profile => res.json(profile));
    });
  })
);

//Delete the whole profile
//POST call

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() => {
        res.json("success");
      });
    });
  }
);

<<<<<<< HEAD
=======
>>>>>>> 90bf76297c61a7bdd143e664c671fea10a38a393
=======
>>>>>>> origin/develop
module.exports = router;
