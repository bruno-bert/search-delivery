import React, { createContext, useReducer, useContext } from "react";

export const GlobalActions = {
  TOGGLE_SIDEBAR: "TOGGLE_SIDEBAR"
};

const GlobalContext = createContext();

const initialState = {
  sidebarHidden: true
};

const navigationReducer = (state, action) => {
  switch (action.type) {
    case GlobalActions.TOGGLE_SIDEBAR:
      return { ...state, sidebarHidden: action.payload.sidebarHidden };

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

export const useGlobalState = () => {
  return useContext(GlobalContext);
};
