import http from "./http";
import config from "../config.json";

const endpoint = "/genres";

const getGenres = () => {
  return http.get(config.apiUrl + endpoint);
};

export default {
  getGenres,
};
