import axios from "axios";
import http from "./http";
import { getJwt } from "./auth";
const apiUrl = "http://api.p26.ir";
http.setJwt(getJwt());

export function getPacks() {
  return axios.get(`${apiUrl}/wallets/SubscriptionPacks/`);
}

export function getWallet() {
  return axios.get(`${apiUrl}/wallets/wallet/`);
}

export function buyPack(id) {
  console.log(id);
  return axios.post(`${apiUrl}/wallets/BuySubscription/`, {
    pack_id: id,
  });
}

export function getReport() {
  return axios.get(`${apiUrl}/wallets/SubscriptionReport/`);
}

export default { getPacks, buyPack, getWallet, getReport };
