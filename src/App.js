import React, {useContext} from "react";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'



import Layout from "./components/Layout";
import DashBoard from './components/DashBoard'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import CreateProject from "./components/CreateProject";
import AuthContextProvider, { AuthContext }from "./contexts/AuthContext" 
import "./styles.css";


/**TODO - implement protected routes */

const ProtectedRoute = ({component: Component, ...rest})=>{
  const { state: {isAuthenticated} } = useContext(AuthContext)
 
 

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

export default function App() {
  return (
    <div className="App">

      <AuthContextProvider>
      <BrowserRouter>
        <Layout>
          
          <Switch>
            <ProtectedRoute exact path='/'component={DashBoard} />
            <ProtectedRoute path='/project' component={CreateProject} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
          </Switch>

        </Layout>
        </BrowserRouter>
      </AuthContextProvider>
     
    </div>
  );
}
