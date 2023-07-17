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

export default { getCategories, getSubCategories, createProduct, getProducts };

const products = [
  {
    _id: "  01",
    title: "تیرآهن IPE 12 - ذوب آهن",
    producer: "فولاد آریا",
    supplier: "پلاک ۲۶",
    price: "16.150",
    updateDate: "۱۴۰۲/۲/۱",
    analysis: "A3",
    loading: "کارخانه",
    state: "شاخه ۱۲ متری",
    size: 18,
    type: "شاخه آجدار",
    unit: "کیلوگرم",
    liked: "۳۲۵",
    tax: "17.604",
  },
  {
    _id: "  01",
    title: "تیرآهن IPE 12 - ذوب آهن",
    producer: "فولاد آریا",
    supplier: "پلاک ۲۶",
    price: "16.150",
    updateDate: "۱۴۰۲/۲/۱",
    analysis: "A3",
    loading: "کارخانه",
    state: "شاخه ۱۲ متری",
    size: 18,
    type: "شاخه آجدار",
    unit: "کیلوگرم",
    liked: "۳۲۵",
    tax: "17.604",
  },
  {
    _id: "  01",
    title: "تیرآهن IPE 12 - ذوب آهن",
    producer: "فولاد آریا",
    supplier: "پلاک ۲۶",
    price: "16.150",
    updateDate: "۱۴۰۲/۲/۱",
    analysis: "A3",
    loading: "کارخانه",
    state: "شاخه ۱۲ متری",
    size: 18,
    type: "شاخه آجدار",
    unit: "کیلوگرم",
    liked: "۳۲۵",
    tax: "17.604",
  },
  {
    _id: "  01",
    title: "تیرآهن IPE 12 - ذوب آهن",
    producer: "فولاد آریا",
    supplier: "پلاک ۲۶",
    price: "16.150",
    updateDate: "۱۴۰۲/۲/۱",
    analysis: "A3",
    loading: "کارخانه",
    state: "شاخه ۱۲ متری",
    size: 18,
    type: "شاخه آجدار",
    unit: "کیلوگرم",
    liked: "۳۲۵",
    tax: "17.604",
  },
  {
    _id: "  01",
    title: "تیرآهن IPE 12 - ذوب آهن",
    producer: "فولاد آریا",
    supplier: "پلاک ۲۶",
    price: "16.150",
    updateDate: "۱۴۰۲/۲/۱",
    analysis: "A3",
    loading: "کارخانه",
    state: "شاخه ۱۲ متری",
    size: 18,
    type: "شاخه آجدار",
    unit: "کیلوگرم",
    liked: "۳۲۵",
    tax: "17.604",
  },
];
