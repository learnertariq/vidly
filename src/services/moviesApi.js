import http from "./http";
import config from "../config.json";

const endpoint = config.apiUrl + "/movies";

const movieUrl = (id) => {
  return `${endpoint}/${id}`;
};

const getMovies = () => {
  return http.get(endpoint);
};

const getMovie = (id) => {
  return http.get(movieUrl(id));
};

const deleteMovie = (movie) => {
  return http.delete(movieUrl(movie._id));
};

const saveMovie = (movie) => {
  if (!movie._id) return http.post(endpoint, movie);

  const movieWithoutId = { ...movie };
  delete movieWithoutId._id;
  return http.put(movieUrl(movie._id), movieWithoutId);
};

export default { getMovies, getMovie, deleteMovie, saveMovie };
