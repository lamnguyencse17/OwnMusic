import { SET_USER, CLEAR_USER } from "../actions/types";

const initialState = {
  _id: "",
  name: "",
  email: "",
  phone: "",
  token: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return { ...action.payload };
    }
    case CLEAR_USER: {
      return { ...initialState };
    }
    default: {
      return state;
    }
  }
};
