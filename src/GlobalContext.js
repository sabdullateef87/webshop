import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import ProductAPI from "./API/ProductAPI";
import UserAPI from "./API/UserAPI";
import CategoryAPI from "./API/CategoryAPI";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [token, setToken] = useState("");

  const getToken = async () => {
    try {
      const res = await axios.get("/user/refresh_token");
      setToken(res.data.accesstoken);
    } catch (error) {
      if (error) {
        throw error;
      }
    }
  };

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      getToken();
    }
  }, []);

  const value = {
    productAPI: ProductAPI(),
    token: [token, setToken],
    user: UserAPI(token),
    categoryAPI: CategoryAPI(),
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
