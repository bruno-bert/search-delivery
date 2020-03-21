import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const initialState = {
  isAuthenticated: false
};

const AuthContextProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
 
  return (
    <AuthContext.Provider value={{ state }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
