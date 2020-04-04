import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { signup, cleanAuthError } from "../../services/auth";

import ErrorMessage from "../utils/ErrorMessage";
import LoginButton from "../utils/LoginButton";

const SignUp = () => {
  //const { authState, dispatch } = useContext(AuthContext)
  const { authState, dispatch } = useAuth();

  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    loading: false
  });

  useEffect(() => {
    cleanAuthError(dispatch);
    //eslint-disable-next-line
  }, []);

  const setLoadingStatus = status => {
    setState({ ...state, loading: status });
  };

  const executeSignUp = async e => {
    e.preventDefault();
    setLoadingStatus(true);
    await signup(
      {
        email: state.email,
        password: state.password,
        confirmPassword: state.confirmPassword,
        name: state.name
      },
      dispatch
    );
    setLoadingStatus(false);
  };

  const handleChange = e => {
    setState({
      ...state,
      [e.target.id]: e.target.value
    });
  };

  /** if logged in, go to main page */
  if (authState.isAuthenticated) return <Redirect to="/" />;
  else
    return (
      <div className="login-form container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Registrar Novo Usuário</div>
              <div className="card-body">
                <form onSubmit={executeSignUp}>
                  <div className="form-group row">
                    <label
                      htmlFor="email"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      E-Mail
                    </label>
                    <div className="col-md-6">
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        name="email"
                        required
                        autoFocus
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="password"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Senha
                    </label>
                    <div className="col-md-6">
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        name="password"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="confirmPassword"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Confirmar Senha
                    </label>
                    <div className="col-md-6">
                      <input
                        type="password"
                        id="confirmPassword"
                        className="form-control"
                        name="confirmPassword"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="password"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Nome Completo (opcional)
                    </label>
                    <div className="col-md-6">
                      <input
                        type="text"
                        id="name"
                        className="form-control"
                        name="name"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 offset-md-4">
                    <LoginButton
                      type="submit"
                      buttonText="Confirmar Registro"
                      icon="fa fa-check"
                      iconSize="20px"
                      buttonType="btn-primary"
                    />
                  </div>

                  {authState.authError ? (
                    <ErrorMessage message={authState.authError} />
                  ) : null}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default SignUp;
