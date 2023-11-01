import axios from "axios";
import http from "./http";
import { getJwt } from "./auth";
const apiUrl = "http://api.p26.ir";

http.setJwt(getJwt());

export function search(searchInput, pageNum, pageSize) {
  return axios.get(
    `${apiUrl}/products/search/?type=product&title=${searchInput}&page=${pageNum}&page_size=${pageSize}`
  );
}

export function filter(searchInput, pageNum, pageSize, selectedFields) {
  for (let key in selectedFields) {
    if (selectedFields[key] === "" || selectedFields[key] === null)
      delete selectedFields[key];
  }
  console.log("selectedFields in filter api");
  console.log(selectedFields);
  return axios.get(
    `${apiUrl}/products/filter/?filter_by=${JSON.stringify(
      selectedFields
    )}&type=category_id=${searchInput}&page=${pageNum}&page_size=${pageSize}`
  );
}
export default { search, filter };
