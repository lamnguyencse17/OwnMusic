import axios from "axios";

export const createLoginRequest = async ({ email, password }) => {
  const requestUrl = `${process.env.BACKEND_SERVER}/api/auth/login`;
  try {
    const res = await axios.post(requestUrl, { email, password });
    return { status: true, token: res.data };
  } catch (err) {
    console.error(err.response.message);
    return {
      status: false,
      errCode: err.response.status,
      message: err.response.data.message,
    };
  }
};

export const createArtistLoginRequest = async ({ email, password }) => {
  const requestUrl = `${process.env.BACKEND_SERVER}/api/auth/login/artist`;
  try {
    const res = await axios.post(requestUrl, { email, password });
    return { status: true, token: res.data };
  } catch (err) {
    console.error(err.response.message);
    return {
      status: false,
      errCode: err.response.status,
      message: err.response.data.message,
    };
  }
};

export const getUserRequest = async (type) => {
  let userUrl;
  if (type === "user") {
    userUrl = `${process.env.BACKEND_SERVER}/api/user`;
  } else {
    userUrl = `${process.env.BACKEND_SERVER}/api/user/artist`;
  }
  try {
    const res = await axios.get(userUrl);
    return { status: true, userData: res.data };
  } catch (err) {
    console.error(err);
    return {
      status: false,
      errCode: err.response.status,
      message: err.response.data.message,
    };
  }
};

export const createRegisterRequest = async ({ name, email, password }) => {
  const requestUrl = `${process.env.BACKEND_SERVER}/api/auth/register`;
  try {
    await axios.post(requestUrl, { name, email, password });
    return { status: true };
  } catch (err) {
    console.error(err.response.message);
    return {
      status: false,
      errCode: err.response.status,
      message: err.response.data.message,
    };
  }
};

export const createArtistRegisterRequest = async ({
  name,
  email,
  password,
}) => {
  const requestUrl = `${process.env.BACKEND_SERVER}/api/auth/register/artist`;
  try {
    await axios.post(requestUrl, { name, email, password });
    return { status: true };
  } catch (err) {
    console.error(err.response.data.message);
    return {
      status: false,
      errCode: err.response.status,
      message: err.response.data.message,
    };
  }
};
