import React from "react"
import { NavLink } from 'react-router-dom'
const SignedInLinks = () => {
 return (
   <>
    
    <NavLink className="nav-item nav-link" to="/signout">Sign Out</NavLink>
    <NavLink className="nav-item nav-link" to="project">Create Project</NavLink>
    
  </>
 
 )
}

export default SignedInLinks