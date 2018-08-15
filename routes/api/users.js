const express = require("express");

const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "connected to Users" }));

module.exports = router;
