import React, { useEffect } from "react";
import NavBar from "./NavBar";
import SideNav from "./SideNav";
import Footer from "./Footer";
import MainContent from "./MainContent";

const Layout = ({ children }) => {
  useEffect(() => {
    window.M.FormSelect.init(document.querySelectorAll("select"), {});
  }, []);

  return (
    <React.Fragment>
      <div className="wrapper">
        <NavBar />
        <SideNav />
        <MainContent>{children}</MainContent>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Layout;
