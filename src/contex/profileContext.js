import { createContext, useContext, useState } from "react";

const ProfileContext = createContext({
  userProfile: {
    shopName: "",
  },
  setProfile: () => {},
});

export const ProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
    shopName: "",
  });
  const setProfile = (p) => {
    setUserProfile({ ...p });
  };
  return (
    <ProfileContext.Provider value={{ userProfile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(ProfileContext);
};
