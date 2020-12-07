const express = require("express");
const { getUserController } = require("../controllers/user");
const router = express.Router();


//Get Some Purchases Of User
router.get("/", getUserController);
//Get A Specific Purhcase ID
router.get("/:purchaseId", getUserController);

module.exports = router;