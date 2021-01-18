import http from "../services/httpService";
import { apiUrl } from "../config.json";
const apiEndPoint = apiUrl + "/users/login";
export function login(email, password) {
  return http.post(apiEndPoint, { email, password });
}
