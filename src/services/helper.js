import axios from "axios";
import { getToken } from "../auth";

export const BASE_URL = "http://localhost:9292/api/v1";
// export const BASE_URL = "https://apis.lcwdblogs.online/api/v1";

export const myAxios = axios.create({
  baseURL: BASE_URL,
});


// This is create to access url which are not open directly and need to be authorized/ intercepted with token  , like addPost url 
export const privateAxios = axios.create({
  baseURL: BASE_URL,
});

//This helps to add the token in every requested made to access the protected url
privateAxios.interceptors.request.use(
  (config) => {
    const token = getToken();              //To fetch the token from the localstorage to check user is loggedIn or not.

    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`;
      // console.log(config);
    }

    return config;
  },
  (error) => Promise.reject(error)
);
