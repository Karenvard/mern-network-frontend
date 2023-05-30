import axios from "axios";

export const $host = axios.create({baseURL: "http://localhost:5858/1.0/api"});

export const $authHost = (function () {
  const $tempHost = axios.create({baseURL: "http://localhost:5858/1.0/api"});
  $tempHost.interceptors.request.use(config => {
    config.headers.set("Authorization", `Bearer ${localStorage.getItem("jwt-token")}`);
    return config;
  })
  return $tempHost;
})();
