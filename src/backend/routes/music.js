const express = require("express");
const { getUserController } = require("../controllers/user");
const router = express.Router();


//Get Random Music
router.get("/", getUserController);
//Get A Specific Music ID
router.get("/:musicId", getUserController);

module.exports = router;