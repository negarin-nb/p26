import axios from "axios";

function setJwt(jwt) {
  if (jwt)
    axios.defaults.headers.common["x-auth-token"] = `Bearer ${JSON.parse(jwt)}`;
}

export default { setJwt };
