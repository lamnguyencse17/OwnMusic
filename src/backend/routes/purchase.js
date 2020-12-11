const express = require("express");
const {
  handlePurchaseController,
  handleSuccessPurchase,
} = require("../controllers/purchase");
const { getUserController } = require("../controllers/user");
const router = express.Router();

//Get Some Purchases Of User
router.get("/", getUserController);
//Get A Specific Purhcase ID
router.get("/:purchaseId/cancel", getUserController);
router.get("/:purchaseId/success", handleSuccessPurchase);

router.post("/", handlePurchaseController);

module.exports = router;
