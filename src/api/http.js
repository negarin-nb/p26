import axios from "axios";

function setJwt(jwt) {
  if (jwt)
    axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      jwt
    )}`;
}

export default { setJwt };
