import React, { createContext, useReducer } from "react";

export const GlobalActions = {
  TOGGLE_SIDEBAR: "TOGGLE_SIDEBAR"
};

export const GlobalContext = createContext();

const initialState = {
  sidebarActive: false
};

const navigationReducer = (state, action) => {
  switch (action.type) {
    case GlobalActions.TOGGLE_SIDEBAR:
      return { ...state, sidebarActive: action.payload.sidebarActive };

    default:
      return state;
  }
};

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(navigationReducer, initialState);

  return (
    <GlobalContext.Provider
      value={{ globalState: state, dispatchGlobalState: dispatch }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
