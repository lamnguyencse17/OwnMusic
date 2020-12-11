import Coinpayments from "coinpayments";

require("dotenv").config();

const coinpaymentClient = new Coinpayments({
  key: process.env.CPM_KEY,
  secret: process.env.CPM_SECRET,
});

export const createTransaction = async ({
  amount,
  buyer_email,
  success_url,
  cancel_url,
}) => {
  try {
    const createTransactionResult = await coinpaymentClient.createTransaction({
      amount,
      buyer_email,
      success_url,
      cancel_url,
      currency1: "USD",
      currency2: "LTCT",
    });
    return { status: true, transaction: createTransactionResult };
  } catch (err) {
    console.error(err);
    return { status: false, message: err };
  }
};
