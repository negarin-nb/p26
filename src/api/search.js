import axios from "axios";
import http from "./http";
import { getJwt } from "./auth";
const apiUrl = "http://api.p26.ir";

http.setJwt(getJwt());

export function search({ searchInput }) {
  return axios.get(
    `${apiUrl}/products/search/?type=product&title=${searchInput}`
  );
}

export function filter({ categoryId }) {
  return axios.get(`${apiUrl}/products/filter/?type=category&id=${categoryId}`);
}
export default { search, filter };
