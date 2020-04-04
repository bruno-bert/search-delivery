import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext";
import GlobalContextProvider from "./contexts/GlobalContext";

import Routes from "./Routes";

import Layout from "./components/Layout";

import "./styles/styles.css";

export default function App() {
  return (
    <GlobalContextProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <Layout>
            <Routes />
          </Layout>
        </BrowserRouter>
      </AuthContextProvider>
    </GlobalContextProvider>
  );
}
