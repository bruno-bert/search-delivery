import React, { createContext, useReducer, useEffect } from "react";
import { firebaseAuth } from "../reducers/authReducer"
import { listenAuthenticationChanges } from "../services/auth"

export const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  authError: null
};

const AuthContextProvider = ({ children }) => {
  
  
  const [state, dispatch] = useReducer(firebaseAuth, initialState);

  useEffect(() => listenAuthenticationChanges(dispatch), [])
  
   return (
    <AuthContext.Provider value={{ authState: state, dispatch }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
