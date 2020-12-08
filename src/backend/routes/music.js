const express = require("express");
const { createMusicController } = require("../controllers/music");
const { getUserController } = require("../controllers/user");
const router = express.Router();

import passport from "passport";

const authenticator = (req, res, next) =>
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user) {
      return res
        .status(401)
        .json({ message: "You are not logged in or cookie has expired" });
    }
    next();
  })(req, res, next);

//Get Random Music
router.get("/", getUserController);
//Get A Specific Music ID
router.get("/:musicId", getUserController);

router.post("/", authenticator, createMusicController);

module.exports = router;
