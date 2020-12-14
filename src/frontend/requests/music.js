import axios from "axios";

export const getMusicSuggestions = async () => {
  const suggestionUrl = `${process.env.BACKEND_SERVER}/api/music/suggestions`;
  try {
    const res = await axios.get(suggestionUrl);
    return { status: true, suggestions: res.data };
  } catch (err) {
    return {
      status: false,
      errCode: err.response.status,
      message: err.response.data.message,
    };
  }
};

export const getMusicRequest = async (musicId) => {
  const musicUrl = `${process.env.BACKEND_SERVER}/api/music/${musicId}`;
  try {
    const res = await axios.get(musicUrl);
    return { status: true, music: res.data };
  } catch (err) {
    return {
      status: false,
      errCode: err.response.status,
      message: err.response.data.message,
    };
  }
};
