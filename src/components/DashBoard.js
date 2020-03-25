import React, {useContext} from "react";
import { AuthContext} from "../contexts/AuthContext"
import SearchBar from "./SearchBar"
const DashBoard = () => {

  const { authState: { user }  } = useContext(AuthContext)
 
  return (
    <>
    <h1>Seja Bem-Vindo {user.displayName} ! </h1>

    // TODO add the search bar here
    <SearchBar />
    </>
  );
};

export default DashBoard;
