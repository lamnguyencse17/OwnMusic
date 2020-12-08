const express = require("express");
const { getArtistAsUserController } = require("../controllers/artist");
const router = express.Router();

router.get("/:artistId", getArtistAsUserController);

module.exports = router;
