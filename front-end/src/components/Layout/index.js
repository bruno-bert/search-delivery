import React from "react";
import NavBar from "./NavBar";
import SideNav from "./SideNav";
import Footer from "./Footer";
import MainContent from "./MainContent";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div className="d-flex w-100 vh-100">
        <SideNav />

        <MainContent>
          <NavBar />

          <div className="flex-grow-1 d-flex flex-column overflow-auto">
            {children}
          </div>

          <Footer />
        </MainContent>
      </div>
    </React.Fragment>
  );
};

export default Layout;
