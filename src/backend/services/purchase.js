import purchaseModel from "../models/purchase";
import artistModel from "../models/artist";
import musicModel from "../models/musics";
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

export const getPurchaseOfUser = async (userId, { limit, offset }) => {
  try {
    let purchase = await purchaseModel
      .find({ user: mongoose.Types.ObjectId(userId) })
      .skip(offset)
      .limit(limit)
      .populate("musics", "-artist")
      .populate("artist", "-password")
      .lean();
    if (!purchase) {
      return { status: false, message: "No purchase found" };
    }
    purchase = purchase.map((record) => {
      if (!record.isCompleted) {
        let musics = record.musics.map((music) => {
          let { downloadURL, ...newMusic } = music;
          return newMusic;
        });
        record.musics = musics;
      }
      return record;
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
    await purchaseModel.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(purchaseId),
      },
      { isPending: false, isCompleted: true }
    );
    return { status: true };
  } catch (err) {
    console.error(err);
    return { status: false, message: err };
  }
};

export const setPurchaseCancelled = async (purchaseId) => {
  try {
    await purchaseModel.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(purchaseId),
      },
      { isPending: false, isCompleted: false }
    );
    return { status: true };
  } catch (err) {
    console.error(err);
    return { status: false, message: err };
  }
};
