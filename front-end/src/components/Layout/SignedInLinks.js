import React from "react";
import { Link } from "react-router-dom";
const SignedInLinks = () => {
  return (
    <>
      <button type="button" className="btn btn-light">
        <Link className="nav-link" to="/signout">
          Sair
        </Link>
      </button>
    </>
  );
};

export default SignedInLinks;
