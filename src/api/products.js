import axios from "axios";

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

export function getProducts() {
  return products;
}

export function createProduct(productData) {
  return axios.post("http://p26.ir/products/product/", {
    title: productData.title,
    description: productData.description,
    link: productData.link,
    tel: productData.tel,
    factory: productData.factory,
    price: productData.price,
    category_id: productData.id,
  });
}
