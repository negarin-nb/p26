import axios from "axios";
import http from "./http";
import { getJwt } from "./auth";
const apiUrl = "http://api.p26.ir";

http.setJwt(getJwt());
axios.defaults.headers.common["content-type"] = "multipart/form-data";
console.log(axios.defaults.headers.common["Content-Type"]);

export function getCategories() {
  return axios.get(`${apiUrl}/products/category/`);
}

export function getSubCategories(id) {
  return axios.get(`${apiUrl}/products/subcategory/${id}/`);
}

export function createProduct(formData) {
  //console.log(formData.values);
  return axios.post(`${apiUrl}/products/myproduct/`, formData);
}

export function getProducts() {
  return axios.get(`${apiUrl}/products/product/`);
}

export function getProduct(id) {
  return axios.get(`${apiUrl}/products/product/${id}/`);
}

export default {
  getCategories,
  getSubCategories,
  createProduct,
  getProducts,
  getProduct,
};
