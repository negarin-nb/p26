import React, { useEffect } from "react";
import HeaderLogedin from "./headerLogedin";
import HeaderNotLogedin from "./headerNotLogedin";
import { useAuth } from "../contex/authContext";

const TypographyStyle = {
  fontWeight: 600,

  textDecoration: "none",
  "&:hover": {
    color: "secondary.main",
  },
};
const ButtonStyle = {
  fontWeight: 600,
  fontSize: "14px",
  textDecoration: "none",
  "&:hover": {
    bgcolor: "white",
    color: "secondary.main",
  },
};

export default function Header() {
  const authCtx = useAuth();
  useEffect(() => {
    if (!authCtx.token) {
      const token = localStorage.getItem("token");
      if (token) {
        authCtx.setUserToken(JSON.parse(token));
      }
    }
  }, []);

  return <>{!!authCtx.token ? <HeaderLogedin /> : <HeaderNotLogedin />}</>;
}
