import { isValidObjectId } from "mongoose";
import { isValidNumber } from "./utils";

export const validateNewPurchase = ({ artist, musics, amount }) => {
  let status = true;
  let message = [];
  if (!isValidObjectId(artist)) {
    status = false;
    message.push("Invalid Artist");
  }
  if (!isValidNumber(amount)) {
    status = false;
    message.push("Invalid Amount");
  }
  for (let music of musics) {
    if (!isValidObjectId(music)) {
      status = false;
      message.push("Invalid Music");
      break;
    }
  }
  return { status, message };
};

export const validatePurchaseId = (purchaseId) => {
  if (!isValidObjectId(purchaseId)) {
    return { status: false, message: "Invalid Purchase Id" };
  }
  return { status: true };
};
