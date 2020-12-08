const express = require("express");
const {
  getUserController,
  getUserArtistController,
} = require("../controllers/user");
const router = express.Router();

router.get("/", getUserController);

router.get("/artist", getUserArtistController);

module.exports = router;
