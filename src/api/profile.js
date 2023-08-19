import axios from "axios";
import http from "./http";
import { getJwt } from "./auth";
const apiUrl = "http://api.p26.ir";

http.setJwt(getJwt());

export function getProfile() {
  http.setJwt(getJwt());

  return axios.get(`${apiUrl}/users/profile/`);
}
export function editProfile(userData) {
  console.log(userData);
  return axios.put(`${apiUrl}/users/profile/`, {
    first_name: userData.firstName,
    last_name: userData.lastName,
    shop_name: userData.shopName,
    email: userData.email,
    phone_number: userData.phoneNumber,
    //address: "",
    co_tell: userData.coTel,
    co_address: userData.coAdress,
    co_site: userData.coWebsite,
    description: "",
  });
}

export function getMyProducts() {
  return axios.get(`${apiUrl}/products/myproduct/`);
}

export default {
  getProfile,
  editProfile,
  getMyProducts,
};
