import musicModel from "../models/musics";
import artistModel from "../models/artist";
import mongoose from "mongoose";

export const createMusic = async ({
  name,
  description,
  coverURL,
  demoURL,
  downloadURL,
  price,
  artist,
}) => {
  try {
    const result = await musicModel.create({
      name,
      description,
      coverURL,
      demoURL,
      downloadURL,
      price,
      artist: mongoose.Types.ObjectId(artist),
    });
    return { music: result, status: true };
  } catch (err) {
    return { status: false, message: err };
  }
};

export const getSingleMusic = async (musicId) => {
  try {
    const result = await musicModel
      .findOne({ _id: mongoose.Types.ObjectId(musicId) })
      .select("-downloadURL")
      .populate("artist", "name _id")
      .lean();
    if (!result) {
      return { status: false, message: "No Music With Such ID Found" };
    }
    return { status: true, music: result };
  } catch (err) {
    console.error(err);
    return { status: false, message: err };
  }
};

export const getMusicByPage = async ({ limit, offset }) => {
  try {
    const result = await musicModel
      .find({})
      .skip(offset)
      .limit(limit)
      .select("-downloadURL")
      .populate("artist", "name _id")
      .lean();
    return { status: true, music: result };
  } catch (err) {
    console.error(err);
    return { status: false, message: err };
  }
};

export const getMusicSuggestions = async () => {
  try {
    const result = await musicModel.aggregate([{ $sample: { size: 5 } }]);
    console.log(result);
    return { status: true, music: result };
  } catch (err) {
    console.error(err);
    return { status: false, message: err };
  }
};
