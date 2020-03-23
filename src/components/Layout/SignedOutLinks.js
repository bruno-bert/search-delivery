import React from "react"
import { NavLink } from 'react-router-dom'
const SignedOutLinks = () => {
 return (
   <>
  
    <NavLink className="nav-item nav-link" to="/signin">Sign In</NavLink>
    <NavLink className="nav-item nav-link" to="/signup">Sign Up</NavLink>

  </>
 
 )
}

export default SignedOutLinks