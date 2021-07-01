import React, { createContext, useReducer } from "react";
import getProducts from "../context/actions/products/getProducts";
import productReducer from "./reducers/productReducer";
import productInitialState from "./initialStates/productsInitialState";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [productState, productDispatch] = useReducer(
    productReducer,
    productInitialState
  );
  return (
    <GlobalContext.Provider
      value={{
        getProducts,
        productState,
        productDispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
