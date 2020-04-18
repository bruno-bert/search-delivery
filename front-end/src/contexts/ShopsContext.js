import React, { createContext, useReducer, useContext } from "react";
import { shopReducer } from "../reducers/shopReducer";

const ShopsContext = createContext();

const initialState = {
  shops: [],
  error: null,
  empty: false
};

const ShopsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  return (
    <ShopsContext.Provider value={{ shopState: state, dispatch }}>
      {children}
    </ShopsContext.Provider>
  );
};

export default ShopsContextProvider;

export const useShops = () => {
  return useContext(ShopsContext);
};
