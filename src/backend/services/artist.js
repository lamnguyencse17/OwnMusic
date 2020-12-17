import artistModel from "../models/artist";
import musicModel from "../models/musics";
import mongoose from "mongoose";

export const createArtist = async ({
  email,
  password,
  name,
  coverURL,
  description,
}) => {
  try {
    const result = await artistModel.create({
      name,
      email,
      password,
      description,
      coverURL,
    });
    return { artist: result, status: true };
  } catch (err) {
    console.error(err);
    return { status: false, message: err };
  }
};

export const getArtistById = async (_id) => {
  try {
    const result = await artistModel
      .findOne({ _id: mongoose.Types.ObjectId(_id) })
      .populate({ path: "musics", select: "-artist" })
      .lean();
    if (!result) {
      return { status: false, message: "No Artist With Such ID" };
    }
    return { status: true, artist: result };
  } catch (err) {
    console.error(err);
    return { status: false, message: err };
  }
};

export const getArtistByIdAsUser = async (_id) => {
  try {
    const result = await artistModel
      .findOne({ _id: mongoose.Types.ObjectId(_id) })
      .populate("musics", "-downloadURL -artist")
      .lean();
    if (!result) {
      return { status: false, message: "No Artist With Such ID" };
    }
    return { status: true, artist: result };
  } catch (err) {
    console.error(err);
    return { status: false, message: err };
  }
};

export const getArtistByEmail = async (email) => {
  try {
    const result = await artistModel.findOne({ email }).lean();
    if (!result) {
      return { status: false, message: "No Artist With Such Email" };
    }
    return { status: true, artist: result };
  } catch (err) {
    console.error(err);
    return { status: false, message: err };
  }
};

export const addMusicToArtist = async (artistId, songId) => {
  try {
    await artistModel.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(artistId) },
      { $push: { musics: mongoose.Types.ObjectId(songId) } }
    );
    return { status: true };
  } catch (err) {
    console.error(err);
    return { status: false, message: err };
  }
};

export const getArtistSuggestions = async () => {
  try {
    const result = await artistModel.aggregate([
      { $sample: { size: 5 } },
      { $project: { password: 0, email: 0, musics: 0 } },
    ]);
    return { status: true, artist: result };
  } catch (err) {
    console.error(err);
    return { status: false, message: err };
  }
};

export const getArtistByPage = async ({ limit, offset }) => {
  try {
    const result = await artistModel
      .find({})
      .skip(offset)
      .limit(limit)
      .select("-password -musics -email")
      .lean();
    return { status: true, artist: result };
  } catch (err) {
    console.error(err);
    return { status: false, message: err };
  }
};

export const doesArtistExist = async (artistId) => {
  try {
    const artist = await artistModel
      .findOne({ _id: mongoose.Types.ObjectId(artistId) })
      .lean();

    if (!artist) {
      return { status: false, message: "No Artist Found" };
    }
    return { status: true };
  } catch (err) {
    console.error(err);
    return { status: false, message: err };
  }
};
