import { HANDLED_ERROR_RESPONSE, OK_RESPONSE } from "../constants/http";
import { addMusicToArtist } from "../services/artist";
import {
  createMusic,
  getMusicByPage,
  getMusicSuggestions,
  getSingleMusic,
} from "../services/music";
import { validateCreateMusic } from "../validators/musicValidator";

export const createMusicController = async (req, res) => {
  const { name, description, coverURL, demoURL, downloadURL, price } = req.body;
  const artist = req._id;
  const validateMusicResult = validateCreateMusic({
    name,
    coverURL,
    demoURL,
    downloadURL,
    price,
  });
  if (!validateMusicResult.status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: validateMusicResult.message });
  }
  const { status, music, message } = await createMusic({
    name,
    description,
    coverURL,
    demoURL,
    downloadURL,
    price,
    artist,
  });
  if (!status) {
    return res.status(HANDLED_ERROR_RESPONSE).json({ message });
  }
  const addToArtistResult = await addMusicToArtist(artist, music._id);
  if (!addToArtistResult.status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: addToArtistResult.message });
  }
  return res.status(OK_RESPONSE).json(music);
};

export const getSingleMusicController = async (req, res) => {
  const musicId = req.params.musicId;
  const { music, message, status } = await getSingleMusic(musicId);
  if (!status) {
    return res.status(HANDLED_ERROR_RESPONSE).json({ message });
  }
  return res.status(OK_RESPONSE).json(music);
};

export const getMusicSuggestionsController = async (req, res) => {
  const { music, message, status } = await getMusicSuggestions();
  if (!status) {
    return res.status(HANDLED_ERROR_RESPONSE).json({ message });
  }
  return res.status(OK_RESPONSE).json(music);
};

export const getMusicByPageController = async (req, res) => {
  const { offset, limit } = req.query;
  const { music, message, status } = await getMusicByPage({
    limit: parseInt(limit),
    offset: parseInt(offset),
  });
  if (!status) {
    return res.status(HANDLED_ERROR_RESPONSE).json({ message });
  }
  return res.status(OK_RESPONSE).json(music);
};
