import React from "react";
import Links from "./Links";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

import { useAuth } from "../../contexts/AuthContext";
import { useGlobalState, GlobalActions } from "../../contexts/GlobalContext";

const NavBar = () => {
  const {
    authState: { isAuthenticated }
  } = useAuth();

  const {
    globalState: { sidebarHidden },
    dispatchGlobalState
  } = useGlobalState();

  const conditionalLinks = isAuthenticated ? (
    <SignedInLinks />
  ) : (
    <SignedOutLinks />
  );

  const toggleSidebar = () =>
    dispatchGlobalState({
      type: GlobalActions.TOGGLE_SIDEBAR,
      payload: { sidebarHidden: !sidebarHidden }
    });

  return (
    <nav className="navbar shadow-sm mb-5 px-5 py-4 navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button
          onClick={toggleSidebar}
          type="button"
          id="sidebarCollapse"
          className={`navbar-btn ${sidebarHidden ? "active" : ""}`}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse text-center"
          id="navbarSupportedContent"
        >
          <ul className="ml-auto navbar-nav">
            <Links />
          </ul>
          <ul className="navbar-nav ml-auto">{conditionalLinks}</ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
