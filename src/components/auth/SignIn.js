import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom"

import { AuthContext } from "../../contexts/AuthContext"
import { login, cleanAuthError } from "../../services/auth"
import ErrorMessage from "../utils/ErrorMessage"

const SignIn = () => {
  
  const { authState, dispatch } = useContext(AuthContext)
  
  const [state, setState] = useState({
    email: '',
    password: '',
    loading: false
  })

  useEffect( () =>{
    cleanAuthError(dispatch)
  }, [])

 
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

        <div className="login-form container">
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header">Entrar</div>
                    <div className="card-body">
                        <form onSubmit={executeLogin}>
                            <div className="form-group row">
                                <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail</label>
                                <div className="col-md-6">
                                    <input type="email" id="email" className="form-control" name="email" required autoFocus onChange={handleChange}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Senha</label>
                                <div className="col-md-6">
                                    <input type="password" id="password" className="form-control" name="password" required onChange={handleChange} />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-md-6 offset-md-4">
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" name="remember" /> Lembrar-me
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 offset-md-4">
                                <button type="submit" className="btn btn-primary">
                                    Entrar
                                </button>

                                {/*
                              <a href="#" className="btn btn-link">
                              Esqueceu a Senha?
                            </a>*/
                                }
                              
                            </div>

                            { authState.authError ? 
                              <ErrorMessage message={authState.authError} />
                            : null }
                    
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>


      );
};

export default SignIn;
