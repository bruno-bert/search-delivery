import React from "react"
import { NavLink } from 'react-router-dom'
const SignedInLinks = () => {
 return (
   <>
    <li><NavLink to="/signout">Sign Out</NavLink></li>
    <li><NavLink to="/project">Create Project</NavLink></li>
  </>
 
 )
}

export default SignedInLinks