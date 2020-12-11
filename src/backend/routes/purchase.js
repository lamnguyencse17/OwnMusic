const express = require("express");
const {
  handlePurchaseController,
  handleCancelledPurchaseController,
  handleSuccessPurchaseController,
} = require("../controllers/purchase");
const { getUserController } = require("../controllers/user");
const router = express.Router();

//Get Some Purchases Of User
router.get("/", getUserController);
//Get A Specific Purhcase ID
router.get("/:purchaseId/cancel", handleCancelledPurchaseController);
router.get("/:purchaseId/success", handleSuccessPurchaseController);

router.post("/", handlePurchaseController);

module.exports = router;
