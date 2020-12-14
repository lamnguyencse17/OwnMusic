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
