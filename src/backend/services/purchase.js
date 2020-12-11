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
    });
    return { status: true, purchase };
  } catch (err) {
    console.error(err);
    return { status: false, message: err };
  }
};
