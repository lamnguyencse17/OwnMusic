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

export const getMusicByPageRequest = async ({ offset, limit }) => {
  const musicPageUrl = `${process.env.BACKEND_SERVER}/api/music?offset=${offset}&limit=${limit}`;
  try {
    const res = await axios.get(musicPageUrl);
    return { status: true, music: res.data };
  } catch (err) {
    return {
      status: false,
      errCode: err.response.status,
      message: err.response.data.message,
    };
  }
};

export const createMusicRequest = async ({
  name,
  description,
  coverURL,
  demoURL,
  downloadURL,
  price,
}) => {
  const createMusicUrl = `${process.env.BACKEND_SERVER}/api/music`;
  try {
    const res = await axios.post(createMusicUrl, {
      name,
      description,
      coverURL,
      demoURL,
      downloadURL,
      price,
    });
    console.log(res.data);
    return { status: true, music: res.data };
  } catch (err) {
    console.log(err.response.data.message);
    return {
      status: false,
      errCode: err.response.status,
      message: err.response.data.message,
    };
  }
};
