import { OK_RESPONSE, HANDLED_ERROR_RESPONSE } from "../constants/http";
import { createUser, getUserByEmail } from "../services/user"
import { hashPassword } from "../utils/password";
import { validateCreateUser } from "../validators/userValidator";

export const registerController = async (req, res) => {
  const { email, name } = req.body;
  let password = req.body.password;
  let validateResult = validateCreateUser({ email, password, name });
  if (!validateResult.status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: validateResult.message });
  }
  const duplicate = await getUserByEmail(email);
  if (duplicate.status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: "Duplicate Email!" });
  }
  password = await hashPassword(password);
  let { result, status } = await createUser({ email, password, name });
  if (!status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: "Something went wrong" });
  }
  return res.status(OK_RESPONSE).json(result);
};