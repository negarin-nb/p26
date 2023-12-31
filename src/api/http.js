import axios from "axios";

function setJwt(jwt) {
  //console.log(JSON.parse(jwt));
  if (jwt)
    axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      jwt
    )}`;
  //console.log(axios.defaults.headers.common["Authorization"]);
}

export default { setJwt };
