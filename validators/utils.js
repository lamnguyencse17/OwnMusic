import { isEmail, isEmpty, isLength, } from "validator";
import {
    PASSWORD_MAX_LENGTH,
    NAME_MAX_LENGTH,
    PASSWORD_MIN_LENGTH
  } from "../constants/input";

export const isValidEmail = (email) => {
    return isEmail(email)
}

export const isValidPassword = (password) => {
    return !isEmpty(password) && isLength(password, {min: PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH})
}

export const isValidName = (name) => {
    return !isEmpty(name) && isLength(name, {max: NAME_MAX_LENGTH})
}