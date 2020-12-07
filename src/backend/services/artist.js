import artistModel from "../models/artist";
import mongoose from "mongoose";

export const createArtist = async ({ email, password, name, description, coverURL }) => {
  try {
    const result = await artistModel.create({
      name,
      email,
      password,
      description,
      coverURL
    });
    return { artist: result, status: true };
  } catch(err) {
    console.error(err);
    return {status: false, message: err}
  }
};

export const getArtistById = async (_id) => {
  try {
    const result = await artistModel.findOne({ _id: mongoose.Types.ObjectId(_id) }).lean();
    if (!result){
      return {status: false, message: "No Artist With Such ID"};
    }
    return {status: true, artist: result};
  } catch(err) {
    console.error(err);
    return {status: false, message: err};
  }
};

export const getArtistByIdAsUser = async (_id) => {
  try {
    const result = await artistModel.findOne({ _id: mongoose.Types.ObjectId(_id) }).populate("musics", "-downloadURL").lean();
    if (!result){
      return {status: false, message: "No Artist With Such ID"};
    }
    return {status: true, artist: result};
  } catch(err) {
    console.error(err);
    return {status: false, message: err};
  }
};

export const getArtistByEmail = async (email) => {
  try {
    const result = await artistModel.findOne({ email }).lean();
    if (!result){
      return {status: false, message: "No Artist With Such Email"};
    }
    return {status: true, artist: result};
  } catch(err) {
    console.error(err);
    return {status: false, message: err};
  }
};