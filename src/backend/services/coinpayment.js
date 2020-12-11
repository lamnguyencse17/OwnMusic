import Coinpayments from "coinpayments";

require("dotenv").config();

const coinpaymentClient = new Coinpayments({
  key: process.env.CPM_KEY,
  secret: process.env.CPM_SECRET,
});
