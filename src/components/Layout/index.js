import React from "react";
import NavBar from "./NavBar";
import SideNav from "./SideNav";
import Footer from "./Footer";
import MainContent from "./MainContent";

const Layout = ({ children }) => {
  
  return (
    <React.Fragment>
      <div className="wrapper">
        <SideNav />
        
        <MainContent>
          <NavBar />
          {children}
         </MainContent>
       {/* <Footer />*/}
      </div>
    </React.Fragment>
  );
};

export default Layout;
