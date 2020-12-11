import { HANDLED_ERROR_RESPONSE, OK_RESPONSE } from "../constants/http";
import { createTransaction } from "../services/coinpayment";
import { createPurchase } from "../services/purchase";

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
