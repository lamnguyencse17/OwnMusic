import {
  isValidEmail,
  isValidPassword,
  isValidName,
  // isValidURL,
} from "./utils";

export const validateCreateArtist = ({ email, password, name, coverURL }) => {
  let status = true;
  let message = [];
  if (!isValidName(name)) {
    status = false;
    message.push("Invalid name");
  }
  if (!isValidEmail(email)) {
    status = false;
    message.push("Invalid email");
  }
  if (!isValidPassword(password)) {
    status = false;
    message.push("Invalid password");
  }
  // if (!isValidURL(coverURL)) {
  //   status = false;
  //   message.push("Invalid Cover URL");
  // }
  return { status, message };
};
