const ads = [
  {
    _id: "  01",
    title: "تیرآهن IPE 12 - ذوب آهن",
    totalePrice: "200000",
    store: "فروشگاه جعفری",
    category: { _id: "01", name: "تیرآهن" },
    numberInStock: 6,
    rate: 2.5,
    publishDate: "2018-01-03T19:04:28.809Z",
    liked: "۳۲۵",
  },
  {
    _id: "  02",
    title: "میل‌گرد ۱۸ ذوب آهن اصفهان",
    totalePrice: "200000",
    store: "فروشگاه جعفری",
    category: { _id: "02", name: "میل‌گرد" },
    numberInStock: 6,
    rate: 2.5,
    publishDate: "2018-01-03T19:04:28.809Z",
    liked: "۲۲۰",
  },
];

export function getAds() {
  return ads;
}