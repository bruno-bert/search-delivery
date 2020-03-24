import React from "react"
import { Link } from 'react-router-dom'
const SignedOutLinks = () => {
 return (
   <>
  
  
                <li className="nav-item">
                  <Link className="nav-item nav-link" to="/signin">Entrar</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-item nav-link" to="/signup">Registrar-se</Link>
                  </li>
  </>
 
 )
}

export default SignedOutLinks