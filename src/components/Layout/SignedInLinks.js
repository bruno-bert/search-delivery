import React from "react"
import { Link } from 'react-router-dom'
const SignedInLinks = () => {
 return (
   <>
    
    <li className="nav-item active">
                    <Link className="nav-link" to="/">Buscar</Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/signout">Sair</Link>
                </li>

             

    
  </>
 
 )
}

export default SignedInLinks