import React, { createContext, useReducer } from "react";
import { shopReducer } from "../reducers/shopReducer";

export const ShopsContext = createContext();

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
