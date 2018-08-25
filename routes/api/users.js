const express = require("express");

const router = express.Router();
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

router.get("/test", (req, res) => res.json({ msg: "connected to Users" }));
router.post("/register", (req, res) => {
  User.findOne({ email: res.body.email }).then(user => {
    if (user) {
      return res.status(404).json({ email: "Email Already Exists" });
    } else {
      const avatar = gravatar(res.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      const newUser = new User({
        name: res.body.name,
        email: res.body.email,
        avatar,
        password: res.body.password
      });

      bcrypt.genSalt(
        10,
        (err,
        salt => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => user.json(user))
              .catch(err => console.log(err));
          });
        })
      );
    }
  });
});

module.exports = router;
