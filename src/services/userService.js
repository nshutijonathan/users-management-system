import http from "../services/httpService";
import { apiUrl } from "../config.json";
const apiEndPoint = apiUrl + "/users";

export function register(user) {
  return http.post(apiEndPoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
export function getJwt() {
  return localStorage.getItem("token");
}
export function getUsers() {
  return http.get(apiEndPoint);
}
export function addUsers() {
  return http.post(apiEndPoint);
}
export function deleteUser(user) {
  return http.delete(apiEndPoint + `/${user.id}`);
}
