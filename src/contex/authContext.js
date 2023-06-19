import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  userData: {
    _id: "",
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    profile_url: "",
    phone: "",
    settings: [],
  },
  setUserAllData: () => {},
  setUserToken: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");

  const setUserToken = (t) => {
    setToken(t);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserToken("");
  };

  //   const setUserAllData = (u) => {
  //     setUserData(u);
  //     localStorage.setItem("userData", JSON.stringify(u));
  //   };

  return (
    <AuthContext.Provider value={{ token, setUserToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
