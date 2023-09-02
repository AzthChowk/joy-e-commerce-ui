import axios from "axios";

export const $axios = axios.create({
  baseURL: "http://localhost:9000",
  timeout: 1000,
});
$axios.interceptors.request.use(function (config) {
  // extract accesstoken from local storage
  const accesstoken = localStorage.getItem("userAccessToken");

  // if token, set it to every request
  if (accesstoken) {
    config.headers.Authorization = `Bearer ${accesstoken}`;
  }

  return config;
});
