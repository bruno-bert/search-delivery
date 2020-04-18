import React, { createContext, useReducer, useEffect, useContext } from "react";
import { firebaseAuth } from "../reducers/authReducer";
import { listenAuthenticationChanges } from "../services/auth";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  authError: null
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(firebaseAuth, initialState);

  useEffect(() => listenAuthenticationChanges(dispatch), []);

  return (
    <AuthContext.Provider value={{ authState: state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
