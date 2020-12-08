const express = require("express");
const {
  getArtistAsUserController,
  getArtistByPageController,
  getArtistSuggestionsController,
} = require("../controllers/artist");
const router = express.Router();

//Get Random Artist
router.get("/suggestions", getArtistSuggestionsController);

//Get A Specific Artist ID
router.get("/:artistId", getArtistAsUserController);

//Get By Page
router.get("/", getArtistByPageController);

module.exports = router;
