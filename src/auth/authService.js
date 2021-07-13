import decode from "jwt-decode";
import http from "../services/http";
import config from "../config.json";

http.setToken(getToken());

const login = async (user) => {
  const { data: token } = await http.post(config.apiUrl + "/auth", {
    email: user.username,
    password: user.password,
  });

  localStorage.setItem(config.tokenKey, token);
};

const logout = () => {
  localStorage.removeItem(config.tokenKey);
};

const register = async (user) => {
  const { headers } = await http.post(config.apiUrl + "/users", {
    name: user.name,
    email: user.username,
    password: user.password,
  });

  localStorage.setItem(config.tokenKey, headers["x-auth-token"]);
};

const getCurrentUser = () => {
  try {
    const token = localStorage.getItem(config.tokenKey);
    return decode(token);
  } catch (ex) {
    return null;
  }
};

function getToken() {
  const token = localStorage.getItem(config.tokenKey);
  return token ? token : null;
}

export default {
  getCurrentUser,
  getToken,
  login,
  logout,
  register,
};
