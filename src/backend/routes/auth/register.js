const express = require("express");
const { registerArtistController } = require("../../controllers/artist");
const { registerController } = require("../../controllers/user");
const router = express.Router();

router.post("/artist", registerArtistController);

router.post("/", registerController);

module.exports = router;
