import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom"

import { AuthContext } from "../../contexts/AuthContext"
import { login } from "../../services/auth"

const SignIn = () => {
  
  const { authState, dispatch } = useContext(AuthContext)
  
  const [state, setState] = useState({
    email: '',
    password: '',
    loading: false
  })

 
  const setLoadingStatus = (status) => {
    setState({...state, loading: status })
  }
 
  const executeLogin = async (e) =>{
    e.preventDefault()
    setLoadingStatus(true)
    await login( { email: state.email, password: state.password } , dispatch)
    setLoadingStatus(false)  
  }

  const handleChange = (e) => {
     setState({
       ...state, 
      [e.target.id]: e.target.value
    })
  }


  if (authState.isAuthenticated)
      return (<Redirect to="/" />)
  else
 
      return (
        <div className="container">
        <form className="white" onSubmit={executeLogin}>
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' onChange={handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' onChange={handleChange} />
          </div>
          <div className="input-field">

            <button className={`btn pink lighten-1 z-depth-0 ${state.loading ? 'disabled' : ''} `}>Login</button>
            
            <div className="center red-text">
              { authState.authError ? <p>{authState.authError}</p> : null }
            </div>

          </div>
        </form>
      </div>
      );
};

export default SignIn;
