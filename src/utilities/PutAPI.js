import axios from "axios";
import { BASE_URL } from "../utilities/URL";
import  secureLocalStorage  from  "react-secure-storage";

export const PutAPI = async (url, putData) => {
  let config = {
    headers: {
      accessToken: secureLocalStorage.getItem("accessToken"),
    },
  };
  try {
    const res = await axios.put(BASE_URL + url, putData, config);
    return res;
  } catch (err) {}
};
