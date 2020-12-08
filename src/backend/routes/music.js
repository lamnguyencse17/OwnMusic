const express = require("express");
const {
  createMusicController,
  getSingleMusicController,
  getMusicSuggestionsController,
  getMusicByPageController,
} = require("../controllers/music");
const router = express.Router();

import passport from "passport";
import { getMusicByPage } from "../services/music";

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
router.get("/suggestions", getMusicSuggestionsController);

//Get A Specific Music ID
router.get("/:musicId", getSingleMusicController);

//Get By Page
router.get("/", getMusicByPageController);

router.post("/", authenticator, createMusicController);

module.exports = router;
