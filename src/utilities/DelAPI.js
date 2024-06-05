import axios from "axios";
import { BASE_URL } from "../utilities/URL";

export const DeleteAPI = async (url) => {
  let config = {
    headers: {
      accessToken: localStorage.getItem("accessToken"),
    },
  };
  try {
    const res = await axios.delete(BASE_URL + url, config);
    return res;
  } catch (err) {}
};
