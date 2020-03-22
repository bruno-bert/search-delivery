import React from "react"
import { NavLink } from 'react-router-dom'
const SignedInLinks = () => {
 return (
   <>
    <li><NavLink data-target="modalSignOut" className="modal-trigger"  to="/signout">Sign Out</NavLink></li>
    <li><NavLink to="/project">Create Project</NavLink></li>
  </>
 
 )
}

export default SignedInLinks