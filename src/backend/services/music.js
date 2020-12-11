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

export const getMusicsById = async (musics) => {
  musics = musics.map((music) => mongoose.Types.ObjectId(music));
  try {
    const result = await musicModel.find({ _id: { $in: musics } }).lean();
    return { status: true, musics: result };
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
    const result = await musicModel.aggregate([
      { $sample: { size: 5 } },
      {
        $lookup: {
          from: "artists",
          localField: "artist",
          foreignField: "_id",
          as: "artist",
        },
      },
      {
        $unwind: {
          path: "$artist",
          preserveNullAndEmptyArrays: false,
        },
      },
      { $project: { downloadURL: 0, "artist.password": 0, "artist.email": 0 } },
    ]);
    console.log(result);
    return { status: true, music: result };
  } catch (err) {
    console.error(err);
    return { status: false, message: err };
  }
};
