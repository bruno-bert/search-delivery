import React, { useEffect } from "react";

const SideNav = () => {
  useEffect(() => {
    window.M.Sidenav.init(document.querySelectorAll(".sidenav"), {});
  }, []);

  return (
    <React.Fragment>
      <ul id="slide-out" className="sidenav">
        <li>
          <div className="user-view">
            <div className="background">
              <img src="images/office.jpg" alt="bgsidebar" />
            </div>
            <a href="#user">
              <img className="circle" src="images/yuna.jpg" alt="avatar" />
            </a>
            <a href="#name">
              <span className="white-text name">John Doe</span>
            </a>
            <a href="#email">
              <span className="white-text email">jdandturk@gmail.com</span>
            </a>
          </div>
        </li>
        <li>
          <a href="#!">
            <i className="material-icons">cloud</i>First Link With Icon
          </a>
        </li>
        <li>
          <a href="#!">Second Link</a>
        </li>
        <li>
          <div className="divider" />
        </li>
        <li>
          <a href="#" className="subheader">
            Subheader
          </a>
        </li>
        <li>
          <a className="waves-effect" href="#!">
            Third Link With Waves
          </a>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default SideNav;
