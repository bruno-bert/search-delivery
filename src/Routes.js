import React, {useContext} from "react";
import { Switch, Route, Redirect } from 'react-router-dom'


import DashBoard from './components/DashBoard'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import SignOut from './components/auth/SignOut'

import CreateProject from "./components/CreateProject";

import  { AuthContext } from "./contexts/AuthContext" 



const ProtectedRoute = ({component: Component, ...rest})=>{
    const {  authState: {isAuthenticated}  } = useContext(AuthContext)

      return (
        <Route 
         {...rest} 
         render={
           props => {
             if (isAuthenticated)
               return <Component {...props}/>
             else
               return <Redirect to={{ pathname: "/signin", state: { from: props.location } } }/>
           }
         }
        /> )
  }

const Routes = () => (

      <Switch>
            <ProtectedRoute exact path='/'component={DashBoard} />
            <ProtectedRoute path='/project' component={CreateProject} />
            <ProtectedRoute path='/signout' component={SignOut} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
        </Switch>

);

export default Routes;