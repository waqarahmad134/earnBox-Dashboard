import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "./URL";
import { info_toaster } from "./Toaster";
import  secureLocalStorage  from  "react-secure-storage";

const GetAPI = (url) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    var config = {
      headers: {
        accessToken: secureLocalStorage.getItem("accessToken"),
      },
    };
    const fetchData = () => {
      axios.get(BASE_URL + url, config).then((dat) => {
        setData(dat.data);
      });
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    var config = {
      headers: {
        accessToken: secureLocalStorage.getItem("accessToken"),
      },
    };
    try {
      axios.get(BASE_URL + url, config).then((dat) => {
        setData(dat.data);
      });
    } catch (err) {
      info_toaster(err);
    }
  };

  return { data, reFetch };
};

export default GetAPI;
