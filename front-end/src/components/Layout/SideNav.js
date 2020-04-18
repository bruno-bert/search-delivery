import React from "react";
import { Link } from "react-router-dom";

import { useGlobalState } from "../../contexts/GlobalContext";

const SideNav = () => {
  const {
    globalState: { sidebarHidden }
  } = useGlobalState();

  return (
    <nav id="sidebar" className={`${sidebarHidden ? "active" : ""}`}>
      <div className="sidebar-header p-3">
        <h3 className="text-white">Busca Delivery</h3>
      </div>

      <ul className="list-unstyled components px-0 py-4">
        <p className="lead text-white font-weight-bold p-3 text-center text-uppercase">
          Menu
        </p>
        {/*
        <li className="active" >
            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Cadastrar Novo</a>
            <ul className="collapse list-unstyled" id="homeSubmenu">
                <li>
                
                    <Link className="nav-link" to="/create"></Link>
                
                </li>
                <li>
                    <a href="#">Home 2</a>
                </li>
                <li>
                    <a href="#">Home 3</a>
                </li>
           </ul>
        </li>
        <li>
            <a href="#">About</a>
            <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Pages</a>
            <ul className="collapse list-unstyled" id="pageSubmenu">
                <li>
                    <a href="#">Page 1</a>
                </li>
                <li>
                    <a href="#">Page 2</a>
                </li>
                <li>
                    <a href="#">Page 3</a>
                </li>
            </ul>
        </li>*/}
        <li className="active">
          <Link to="/">Buscar</Link>
        </li>

        <li>
          <Link to="/create">Novo Delivery</Link>
        </li>
      </ul>

      {/*
    <ul className="list-unstyled CTAs">
        <li>
            <a href="https://bootstrapious.com/tutorial/files/sidebar.zip" className="download">Download source</a>
        </li>
        <li>
            <a href="https://bootstrapious.com/p/bootstrap-sidebar" className="article">Back to article</a>
        </li>
    </ul>*/}
    </nav>
  );
};

export default SideNav;
