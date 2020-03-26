import React, {useContext} from "react";
import { Switch, Route, Redirect } from 'react-router-dom'


import Home from './components/Home'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import SignOut from './components/auth/SignOut'

import CreateDelivery from "./components/CreateDelivery";

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
            <ProtectedRoute exact path='/'component={Home} />
            <ProtectedRoute path='/create' component={CreateDelivery} />
            <ProtectedRoute path='/signout' component={SignOut} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
        </Switch>

);

export default Routes;