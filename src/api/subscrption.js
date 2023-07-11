import axios from "axios";
import http from "./http";
import { getJwt } from "./auth";
const apiUrl = "http://api.p26.ir";
http.setJwt(getJwt());

export function getPacks() {
  return axios.get(`${apiUrl}/wallets/SubscriptionPacks/`);
}

export default { getPacks };
