import axios from "axios";

export const getArtistRequest = async (artistId) => {
  const artistUrl = `${process.env.BACKEND_SERVER}/api/artist/${artistId}`;
  try {
    const res = await axios.get(artistUrl);
    return { status: true, artist: res.data };
  } catch (err) {
    return {
      status: false,
      errCode: err.response.status,
      message: err.response.data.message,
    };
  }
};

export const getArtistByPageRequest = async ({ offset, limit }) => {
  const artistPageUrl = `${process.env.BACKEND_SERVER}/api/artist?offset=${offset}&limit=${limit}`;
  try {
    const res = await axios.get(artistPageUrl);
    return { status: true, artist: res.data };
  } catch (err) {
    return {
      status: false,
      errCode: err.response.status,
      message: err.response.data.message,
    };
  }
};
