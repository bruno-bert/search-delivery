import React, { useContext } from "react";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

import { AuthContext } from "../../contexts/AuthContext"

const NavBar = () => {
  const {  authState: {isAuthenticated}  } = useContext(AuthContext)
 
  const links = isAuthenticated ? <SignedInLinks/> : <SignedOutLinks />

  return (
    <nav>
      <div className="container nav-wrapper">
        <a href="#" data-target="slide-out" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>

        <a href="#" className="brand-logo">
          Logo
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
        {links}        
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
