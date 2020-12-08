import { OK_RESPONSE, HANDLED_ERROR_RESPONSE } from "../constants/http";
import {
  createArtist,
  getArtistByEmail,
  getArtistByIdAsUser,
} from "../services/artist";
import { hashPassword, comparePassword } from "../utils/password";
import createToken from "../utils/token";
import { validateCreateArtist } from "../validators/artistValidator";
import { validateLogInUser } from "../validators/userValidator";

export const registerArtistController = async (req, res) => {
  const { name, email, description, coverURL } = req.body;
  let password = req.body.password;
  let validateResult = validateCreateArtist({
    email,
    password,
    name,
    description,
    coverURL,
  });
  if (!validateResult.status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: validateResult.message });
  }
  const duplicate = await getArtistByEmail(email);
  if (duplicate.status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: "Duplicate Email!" });
  }
  password = await hashPassword(password);
  let { artist, status, message } = await createArtist({
    email,
    password,
    name,
    description,
    coverURL,
  });
  if (!status) {
    return res.status(HANDLED_ERROR_RESPONSE).json({ message });
  }
  artist = artist.toJSON();
  delete artist.password;
  return res.status(OK_RESPONSE).json(artist);
};

export const logInArtistController = async (req, res) => {
  const { email, password } = req.body;
  const validateResult = validateLogInUser({ email, password });
  if (!validateResult.status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: validateResult.message });
  }
  let { artist, status, message } = await getArtistByEmail(email);
  if (!status) {
    return res.status(HANDLED_ERROR_RESPONSE).json({ message });
  }
  const result = await comparePassword(password, artist.password);
  if (!result.status) {
    return res.status(HANDLED_ERROR_RESPONSE).json({ message: result.message });
  }
  const token = createToken({ _id: artist._id, email });
  return res
    .status(OK_RESPONSE)
    .cookie("token", token, {
      maxAge: 3600000,
      httpOnly: true,
    })
    .json({
      token,
    });
};

export const getArtistAsUserController = async (req, res) => {
  const artistId = req.params.artistId;
  let { artist, status, message } = await getArtistByIdAsUser(artistId);
  if (!status) {
    return res.status(HANDLED_ERROR_RESPONSE).json({ message });
  }
  delete artist.password;
  return res.status(OK_RESPONSE).json(artist);
};
