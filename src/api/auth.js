import axios from "axios";
//import http from "./http";
import apiUrl from "../config.json";
import { useAuth } from "../contex/authContext";

export function sendPhone(phone) {
  return axios.post("http://api.p26.ir/users/SendVerificationCode/", {
    phone_number: phone,
    dev_mode: false,
  });
}

export function sendVerificationCode({ phone, otp }) {
  return axios.post("http://api.p26.ir/users/CheckVerificationCode/", {
    phone_number: phone,
    verification_code: otp,
  });
}

export function register({ phone, otp, register }) {
  return axios.post("http://api.p26.ir/users/register/", {
    phone_number: phone,
    verification_code: otp,
    password: register.password,
    first_name: register.userName,
    last_name: "",
    shop_name: "",
  });
}

export function login(userData) {
  return axios.post("http://api.p26.ir/users/login/", {
    username: userData.username,
    password: userData.password,
  });
}

export function getJwt() {
  return localStorage.getItem("token");
}

export default {
  login,
  sendPhone,
  sendVerificationCode,
  register,
  getJwt,
};
