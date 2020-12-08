const express = require("express");
const { logInArtistController } = require("../../controllers/artist");
const { logInController } = require("../../controllers/user");
const router = express.Router();

router.post("/artist", logInArtistController);

router.post("/", logInController);

module.exports = router;
