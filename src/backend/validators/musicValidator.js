import { isValidName, isValidNumber, isValidURL } from "./utils";

export const validateCreateMusic = ({
  name,
  coverURL,
  demoURL,
  downloadURL,
  price,
}) => {
  let status = true;
  let message = [];
  if (!isValidName(name)) {
    status = false;
    message.push("Invalid name");
  }
  if (!isValidURL(coverURL)) {
    status = false;
    message.push("Invalid coverURL");
  }
  if (!isValidURL(downloadURL)) {
    status = false;
    message.push("Invalid downloadURL");
  }
  if (!isValidURL(demoURL)) {
    status = false;
    message.push("Invalid demoURL");
  }
  if (!isValidNumber(price)) {
    status = false;
    message.push("Invalid price");
  }
  return { status, message };
};
