import React from "react";
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from "./contexts/AuthContext" 
import Routes from './Routes'

import Layout from "./components/Layout";
import "./styles.css";





export default function App() {
  return (
    <div className="App">

      <AuthContextProvider>
      <BrowserRouter>
        <Layout>
          
          <Routes />

        </Layout>
        </BrowserRouter>
      </AuthContextProvider>
     
    </div>
  );
}
