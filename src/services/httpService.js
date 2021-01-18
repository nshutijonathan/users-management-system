import axios from "axios";
import { getJwt } from "./userService.js";
import { toast } from "react-toastify";

axios.defaults.headers.common["x-auth-token"] = getJwt();

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 409 &&
    error.response.status < 500;
  if (!expectedError) {
    console.log("Logging the error", error);
    toast("Unexpected error occured");
  }

  return Promise.reject(error);
});
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
