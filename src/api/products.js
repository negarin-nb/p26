import axios from "axios";
import http from "./http";
import { getJwt } from "./auth";
const apiUrl = "http://api.p26.ir";

http.setJwt(getJwt());

export function getCategories() {
  return axios.get(`${apiUrl}/products/category/`);
}

export function getSubCategories(id) {
  return axios.get(`${apiUrl}/products/subcategory/${id}/`);
}

export function createProduct(productData) {
  return axios.post(`${apiUrl}/products/product/`, productData);
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
