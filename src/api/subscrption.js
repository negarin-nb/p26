import axios from "axios";
import apiUrl from "../config.json";
import http from "./http";
import { getJwt } from "./auth";

http.setJwt(getJwt());

export function getPacks() {
  return axios.get(`http://api.p26.ir/wallets/SubscriptionPacks/`);
}

export default { getPacks };
