import { HANDLED_ERROR_RESPONSE, OK_RESPONSE } from "../constants/http";
import { createTransaction } from "../services/coinpayment";
import { getMusicsById } from "../services/music";
import {
  createPurchase,
  getPurchaseById,
  setPurchaseComplete,
} from "../services/purchase";

export const handlePurchaseController = async (req, res) => {
  const { _id, email } = req;
  const { artist, musics, amount } = req.body;
  const createPurchaseStatus = await createPurchase({
    user: _id,
    artist,
    musics,
  });
  if (!createPurchaseStatus.status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: createPurchaseStatus.message });
  }
  const { purchase } = createPurchaseStatus;
  // purchase id is not disclosed till user access so it's impossible to forge a purchase
  const success_url = `${process.env.BACKEND_SERVER}/purchase/${purchase._id}/success/`;
  const cancel_url = `${process.env.BACKEND_SERVER}/purchase/${purchase._id}/cancel/`;
  const createTransactionResult = await createTransaction({
    amount,
    buyer_email: email,
    cancel_url,
    success_url,
  });
  if (!createTransactionResult.status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: createTransactionResult.message });
  }
  return res
    .status(OK_RESPONSE)
    .json({ transaction: createTransactionResult.transaction });
};

export const handleSuccessPurchase = async (req, res) => {
  const purchaseId = req.params.purchaseId;
  const getPurchaseResult = await getPurchaseById(purchaseId);
  if (!getPurchaseResult.status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: getPurchaseResult.message });
  }
  const { isCompleted, isPending, musics } = getPurchaseResult.purchase;
  if (!isPending && isCompleted) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: "We are calling the police" });
  }
  if (!isPending) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: "This purchase has been completed" });
  }
  const setCompleteResult = await setPurchaseComplete(purchaseId);
  if (!setCompleteResult.status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: setCompleteResult.message });
  }
  const getDownloadResult = await getMusicsById(musics);
  if (!getDownloadResult.status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: getDownloadResult.message });
  }
  return res.status(OK_RESPONSE).json({ downloads: getDownloadResult.musics });
};
