import axios from "axios";

export const createPurchaseRequest = async ({ artist, musics, amount }) => {
  const purchaseUrl = `${process.env.BACKEND_SERVER}/api/purchase`;
  try {
    const res = await axios.post(purchaseUrl, { artist, musics, amount });
    return { status: true, purchase: res.data };
  } catch (err) {
    console.log(err.response.data.message);
    return {
      status: false,
      errCode: err.response.status,
      message: err.response.data.message,
    };
  }
};

export const getUserPurchaseRequest = async ({ offset, limit }) => {
  const purchaseUrl = `${process.env.BACKEND_SERVER}/api/purchase?offset=${offset}&limit=${limit}`;
  try {
    const res = await axios.get(purchaseUrl);
    return { status: true, purchase: res.data };
  } catch (err) {
    console.error(err);
    return {
      status: false,
      errCode: err.response.status,
      message: err.response.data.message,
    };
  }
};
