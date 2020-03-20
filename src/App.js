import React from "react";
import "./styles.css";
import Layout from "./components/Layout";
import AuthContext from "./contexts/AuthContext";
import MultiStepForm from "./components/MultiStepForm";

export default function App() {
  return (
    <div className="App">
      <AuthContext>
        <Layout>
          <MultiStepForm />
        </Layout>
      </AuthContext>
    </div>
  );
}
