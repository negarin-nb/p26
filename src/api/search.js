import axios from "axios";
import http from "./http";
import { getJwt } from "./auth";
const apiUrl = "http://api.p26.ir";

http.setJwt(getJwt());

console.log(getJwt());

export function search(input) {
  console.log(input);
  return axios.get(`${apiUrl}/products/search/`, {
    params: {
      type: "title",
      title: input,
      category: "1",
    },
  });
}

axios.get();

export default { search };
