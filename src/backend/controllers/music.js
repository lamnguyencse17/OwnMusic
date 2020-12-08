import { HANDLED_ERROR_RESPONSE, OK_RESPONSE } from "../constants/http";
import { addMusicToArtist } from "../services/artist";
import { createMusic } from "../services/music";
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
