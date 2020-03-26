import React, {useContext} from "react";
import { AuthContext} from "../contexts/AuthContext"
import SearchBar from "./SearchBar"
import ShopList from "./ShopList"
import ShopsContextProvider from "../contexts/ShopsContext"

const Home = () => {

  const { authState: { user }  } = useContext(AuthContext)
 
  return (
    <>
    <h1>Seja Bem-Vindo {user.displayName} ! </h1>

   
   <ShopsContextProvider >
     <SearchBar />
     <ShopList />
   </ShopsContextProvider>
    
    </>
  );
};

export default Home;
