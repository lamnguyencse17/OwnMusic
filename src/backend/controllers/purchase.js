import { HANDLED_ERROR_RESPONSE, OK_RESPONSE } from "../constants/http";
import { doesArtistExist } from "../services/artist";
import { createTransaction } from "../services/coinpayment";
import { doMusicsExist, getMusicsById } from "../services/music";
import {
  createPurchase,
  getPurchaseById,
  getPurchaseOfUser,
  setPurchaseCancelled,
  setPurchaseComplete,
} from "../services/purchase";
import {
  validateNewPurchase,
  validatePurchaseId,
} from "../validators/purchaseValidator";

export const getUserPurchaseController = async (req, res) => {
  const userId = req._id;
  const { limit, offset } = req.params;
  const { purchase, status, message } = await getPurchaseOfUser(userId, {
    limit,
    offset,
  });
  if (!status) {
    return res.status(HANDLED_ERROR_RESPONSE).json({ message });
  }
  return res.status(OK_RESPONSE).json(purchase);
};

export const handlePurchaseController = async (req, res) => {
  // const { _id, email } = req;
  const _id = req._id;
  const email = req.email;
  const { artist, musics, amount } = req.body;
  const validateResult = validateNewPurchase({ artist, musics, amount });
  if (!validateResult.status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: validateResult.message });
  }
  const artistExistResult = await doesArtistExist(artist);
  if (!artistExistResult.status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: artistExistResult.message });
  }
  const musicExistResult = await doMusicsExist(musics);
  if (!musicExistResult.status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: musicExistResult.message });
  }
  const createPurchaseStatus = await createPurchase({
    user: _id,
    artist,
    musics,
    price: amount,
  });
  if (!createPurchaseStatus.status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: createPurchaseStatus.message });
  }
  const { purchase } = createPurchaseStatus;
  const success_url = `${process.env.BACKEND_SERVER}/purchase/${purchase._id}/success/`;
  const cancel_url = `${process.env.BACKEND_SERVER}/purchase/${purchase._id}/cancel/`;
  const createTransactionResult = await createTransaction({
    amount,
    buyer_email: email,
    cancel_url,
    success_url,
    transaction: purchase._id,
  });
  if (!createTransactionResult.status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: createTransactionResult.message });
  }
  return res
    .status(OK_RESPONSE)
    .json({ ...createTransactionResult.transaction });
};

export const handleSuccessPurchaseController = async (req, res) => {
  const purchaseId = req.params.purchaseId;
  const validatePurchaseIdResult = validatePurchaseId(purchaseId);
  if (!validatePurchaseIdResult.status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: validatePurchaseIdResult.message });
  }
  const getPurchaseResult = await getPurchaseById(purchaseId);
  if (!getPurchaseResult.status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: getPurchaseResult.message });
  }
  const { isCompleted, isPending } = getPurchaseResult.purchase;
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
  // const setCompleteResult = await setPurchaseComplete(purchaseId);
  // if (!setCompleteResult.status) {
  //   return res
  //     .status(HANDLED_ERROR_RESPONSE)
  //     .json({ message: setCompleteResult.message });
  // }
  // const getDownloadResult = await getMusicsById(musics);
  // if (!getDownloadResult.status) {
  //   return res
  //     .status(HANDLED_ERROR_RESPONSE)
  //     .json({ message: getDownloadResult.message });
  // }
  return res.status(OK_RESPONSE).json({ message: "Purchase is completed" });
};

export const handleCancelledPurchaseController = async (req, res) => {
  const purchaseId = req.params.purchaseId;
  const validatePurchaseIdResult = validatePurchaseId(purchaseId);
  if (!validatePurchaseIdResult.status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: validatePurchaseIdResult.message });
  }
  const getPurchaseResult = await getPurchaseById(purchaseId);
  if (!getPurchaseResult.status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: getPurchaseResult.message });
  }
  const { isCompleted, isPending } = getPurchaseResult.purchase;
  if (!isPending && isCompleted) {
    return res.status(HANDLED_ERROR_RESPONSE).json({ message: "But Why?" });
  }
  if (!isPending) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: "This purchase has been cancelled" });
  }
  // const setCancelledResult = await setPurchaseCancelled(purchaseId);
  // if (!setCancelledResult.status) {
  //   return res
  //     .status(HANDLED_ERROR_RESPONSE)
  //     .json({ message: setCancelledResult.message });
  // }
  return res.status(OK_RESPONSE).json({ message: "Purchase is cancelled" });
};
