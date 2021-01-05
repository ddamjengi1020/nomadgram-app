import AsyncStorage from "@react-native-community/async-storage";
import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ checkLoggedIn, children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(checkLoggedIn);
  const logUserIn = async (token) => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("token", `bearer ${token}`);
      setIsLoggedIn(true);
    } catch (e) {
      console.log(e);
    }
  };

  const logUserOut = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "false");
      setIsLoggedIn(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logUserIn, logUserOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useIsLoggedIn = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn;
};
export const useLogIn = () => {
  const { logUserIn } = useContext(AuthContext);
  return logUserIn;
};
export const useLogOut = () => {
  const { logUserOut } = useContext(AuthContext);
  return logUserOut;
};
