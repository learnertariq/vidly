import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (ex) => {
  const expectedError =
    ex.response && ex.response.status >= 400 && ex.response.status < 500;

  if (!expectedError) {
    console.log(ex);
    toast("An Unexpected Error occured");
  }

  return Promise.reject(ex);
});

const setToken = (authToken) => {
  axios.defaults.headers.common["x-auth-token"] = authToken;
};

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setToken,
};
