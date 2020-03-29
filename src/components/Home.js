import React  from "react";
//import { AuthContext} from "../contexts/AuthContext"
import SearchBar from "./SearchBar"
import ShopList from "./ShopList"
import ShopsContextProvider from "../contexts/ShopsContext"

const Home = () => {

  //const { authState: { user }  } = useContext(AuthContext)


  return (
    <>
    
   <ShopsContextProvider >
   <div className="mx-5">
     <SearchBar />
     <ShopList />
     </div>
   </ShopsContextProvider>
    
    </>
  );
};

export default Home;
