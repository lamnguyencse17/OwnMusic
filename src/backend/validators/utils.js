import { isEmail, isEmpty, isLength, isURL } from "validator";
import {
  PASSWORD_MAX_LENGTH,
  NAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from "../constants/input";

export const isValidEmail = (email) => {
  return !!email && !isEmpty(email) && isEmail(email);
};

export const isValidPassword = (password) => {
  return (
    !!password &&
    !isEmpty(password) &&
    isLength(password, { min: PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH })
  );
};

export const isValidName = (name) => {
  return !!name && !isEmpty(name) && isLength(name, { max: NAME_MAX_LENGTH });
};

export const isValidURL = (url) => {
  return !!url && !isEmpty(url) && isURL(url);
};

export const isValidNumber = (number) => {
  return !isNaN(number) && number >= 0;
};
