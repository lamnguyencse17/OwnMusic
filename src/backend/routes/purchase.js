const express = require("express");
const {
  handlePurchaseController,
  handleCancelledPurchaseController,
  handleSuccessPurchaseController,
  getUserPurchaseController,
} = require("../controllers/purchase");
const router = express.Router();

//Get Some Purchases Of User
router.get("/", getUserPurchaseController);
//Get A Specific Purhcase ID
router.get("/:purchaseId/cancel", handleCancelledPurchaseController);
router.get("/:purchaseId/success", handleSuccessPurchaseController);

router.post("/", handlePurchaseController);

module.exports = router;
