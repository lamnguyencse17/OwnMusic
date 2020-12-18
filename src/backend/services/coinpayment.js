import Coinpayments from "coinpayments";
import lodash from "lodash";
import { setPurchaseCancelled, setPurchaseComplete } from "./purchase";

require("dotenv").config();

let transactionList = {};

const coinpaymentClient = new Coinpayments({
  key: process.env.CPM_KEY,
  secret: process.env.CPM_SECRET,
});

export const createTransaction = async ({
  amount,
  buyer_email,
  success_url,
  cancel_url,
  transaction,
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
    transactionList[`${transaction}`] = createTransactionResult.txn_id;
    return { status: true, transaction: createTransactionResult };
  } catch (err) {
    console.error(err);
    return { status: false, message: err };
  }
};

export const transactionStatus = async () => {
  const txList = getTransactionList();
  if (lodash.keys(txList).length === 0) {
    return;
  }
  const statuses = await coinpaymentClient.getTxMulti(lodash.values(txList));
  lodash.forOwn(statuses, async (value, key) => {
    if (value.status_text === "Complete") {
      lodash.forOwn(txList, async (txId, purchaseId) => {
        if (txId === key) {
          const setCompleteResult = await setPurchaseComplete(purchaseId);
          if (!setCompleteResult.status) {
            console.error(setCompleteResult.message);
          }
          console.log(`Completed: ${purchaseId}`);
          setTransactionList(lodash.omit(transactionList, [purchaseId]));
        }
      });
    }
    if (value.time_expires < Date.now() / 1000) {
      lodash.forOwn(txList, async (txId, purchaseId) => {
        if (txId === key) {
          const setCancelledResult = await setPurchaseCancelled(purchaseId);
          if (!setCancelledResult.status) {
            console.error(setCancelledResult.message);
          }
          console.log(`Cancelled: ${purchaseId}`);
          setTransactionList(lodash.omit(transactionList, [purchaseId]));
        }
      });
    }
  });
  console.log(getTransactionList());
};

export const getTransactionList = () => transactionList;
export const setTransactionList = (newList) => (transactionList = newList);
