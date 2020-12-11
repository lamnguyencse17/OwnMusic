import purchaseModel from "../models/purchase";
import mongoose from "mongoose";

export const createPurchase = async ({ user, artist, musics }) => {
  try {
    const purchase = await purchaseModel.create({
      user: mongoose.Types.ObjectId(user),
      artist: mongoose.Types.ObjectId(artist),
      musics:
        musics === []
          ? [] // null is pure donation
          : musics.map((music) => mongoose.Types.ObjectId(music)),
      isCompleted: false,
      isPending: true,
    });
    return { status: true, purchase };
  } catch (err) {
    console.error(err);
    return { status: false, message: err };
  }
};

export const getPurchaseById = async (purchaseId) => {
  try {
    const purchase = await purchaseModel
      .findOne({ _id: mongoose.Types.ObjectId(purchaseId) })
      .lean();
    if (!purchase) {
      return { status: false, message: "No Purchase Found" };
    }
    return { status: true, purchase };
  } catch (err) {
    console.error(err);
    return { status: false, message: err };
  }
};

export const setPurchaseComplete = async (purchaseId) => {
  try {
    await purchaseModel.findOneAndUpdate({
      _id: mongoose.Types.ObjectId(purchaseId),
    });
    return { status: true };
  } catch (err) {
    console.error(err);
    return { status: false, message: err };
  }
};
