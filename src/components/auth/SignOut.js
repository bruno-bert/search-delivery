import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext"
import { Link } from "react-router-dom"

import { signout } from "../../services/auth"

const SignOut =  () => {
  const [state, setState] = useState({loading: false})
  const { dispatch } = useContext(AuthContext)

  
  const setLoadingStatus = (status) => {
    setState({...state, loading: status })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setLoadingStatus(true)
    await signout(dispatch)
    setLoadingStatus(false)
  }

  /** the redirect is being performed by the Route.js (ProtectedRoute) */
  //if (!authState.isAuthenticated){
  //  console.log('redirecting to signin...')
  //  return (<Redirect to="/signin"></Redirect>)
  //}
  


  return (
    <div className="card">
    <div className="card-content">
      <h4>Sign Out</h4>
      <p>Are You Sure?</p>
    </div>
    <div className="card-footer">
      <a href="#!" onClick={handleSubmit} className="waves-effect waves-green btn-flat">Confirm</a>
      <Link to="/" className="waves-effect waves-green btn-flat">Cancel</Link>
    </div>
  </div>
  );
};

export default SignOut;
