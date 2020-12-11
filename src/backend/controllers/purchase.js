import Coinpayments from "coinpayments";

require("dotenv").config();

const coinpaymentClient = new Coinpayments({
  key: process.env.CPN_KEY,
  secret: process.env.CPN_SECRET,
});

export const handlePurchase = (req, res) => {};
