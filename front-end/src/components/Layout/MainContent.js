import React from "react";

const MainContent = ({ children }) => {
  return <main className="d-flex flex-column flex-grow-1">{children}</main>;
};
export default MainContent;
