import React from "react";
const NavBar = () => {
  return (
    <nav>
      <div className="container nav-wrapper">
        <a href="#" data-target="slide-out" className="sidenav-trigger">
          <i class="material-icons">menu</i>
        </a>

        <a href="#" className="brand-logo">
          Logo
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <a href="sass.html">Sass</a>
          </li>
          <li>
            <a href="badges.html">Components</a>
          </li>
          <li>
            <a href="collapsible.html">JavaScript</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
