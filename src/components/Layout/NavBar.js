import React, { useContext, useState } from "react";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

import { AuthContext } from "../../contexts/AuthContext"
import { GlobalContext, GlobalActions } from "../../contexts/GlobalContext"


const NavBar = () => {
  const {  authState: {isAuthenticated}  } = useContext(AuthContext)
  const {  globalState: {sidebarActive}, dispatchGlobalState  } = useContext(GlobalContext)

  const links = isAuthenticated ? <SignedInLinks/> : <SignedOutLinks />


const toggleSidebar = () => dispatchGlobalState({ type: GlobalActions.TOGGLE_SIDEBAR, payload: { sidebarActive: !sidebarActive } } )

  return (
   

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
<button onClick={toggleSidebar} type="button" id="sidebarCollapse" className={`navbar-btn ${sidebarActive ? 'active' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
    
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
     
     
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
                {links}
               
            </ul>
      
    </div>
    </div>
</nav>

  );
};

export default NavBar;
