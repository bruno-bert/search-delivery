import React from "react";
import { Link } from "react-router-dom";
const Links = () => {
  return (
    <>
      <button type="button" className="btn btn-light ">
        <Link className="nav-link" to="/">
          Busca Delivery
        </Link>
      </button>
    </>
  );
};

export default Links;
