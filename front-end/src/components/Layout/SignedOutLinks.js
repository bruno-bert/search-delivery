import React from "react";
import { Link } from "react-router-dom";
const SignedOutLinks = () => {
  return (
    <>
      <Link className="nav-link" to="/signin">
        <button type="button" className="btn btn-primary btn-lg">
          Entrar
        </button>
      </Link>

      <Link className="nav-link " to="/signup">
        <button type="button" className="btn btn-light btn-lg">
          Registrar-se
        </button>
      </Link>
    </>
  );
};

export default SignedOutLinks;
