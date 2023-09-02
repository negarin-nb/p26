import axios from "axios";

const apiUrl = "http://api.p26.ir";

export function createBid({ id, price }) {
  //console.log(searchInput);
  return axios.post(`${apiUrl}/products/bidding/`, {
    product_id: id,
    price: price,
  });
}
export default { createBid };
