import { getUserRequest } from "../requests/user";
import { SET_USER, CLEAR_USER } from "./types";

export const setUser = ({ token, type }) => async (dispatch) => {
  const getUserResult = await getUserRequest(type);
  await localStorage.setItem("type", type);
  if (!getUserResult.status) {
    if (getUserResult.errCode === 401) {
      // clearUser();
      return false;
    }
  } else {
    dispatch({ type: SET_USER, payload: { ...getUserResult.userData, type } });
    return getUserResult.userData.token || true;
  }
};

export const clearUser = () => async (dispatch) => {
  localStorage.setItem("isLogin", "false");
  dispatch({ type: CLEAR_USER });
};
