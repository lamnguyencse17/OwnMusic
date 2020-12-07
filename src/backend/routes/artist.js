const express = require("express");
const { getUserController } = require("../controllers/user");
const router = express.Router();


//Get Random Artist
router.get("/", getUserController);
//Get A Specific Artist ID
router.get("/:artistId", getUserController);

module.exports = router;