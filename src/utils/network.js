import axios from "axios";

// Отправляет запрос Axios
export const getApiResource = async (url) => {
  try {
    const res = await axios.get(url);

    if (res.status !== 200) {
      console.error('Could not get data from API.', res.status);
      return false;
    }

    return res;
  } catch (error) {
    console.error('Could not get data from API.', error.message);
    return false;
  }
}