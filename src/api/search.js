import axios from "axios";
import http from "./http";
import { getJwt } from "./auth";
const apiUrl = "http://api.p26.ir";

http.setJwt(getJwt());

export function search(input) {
  return axios.get(`${apiUrl}/products/search/?type=product&title=${input}`);
}

export default { search };
