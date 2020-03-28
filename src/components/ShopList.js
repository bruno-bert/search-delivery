import React, { useState, useEffect, useContext } from 'react'
import Shop from "./Shop"
import { getShops } from "../services/shops"
import { ShopsContext } from "../contexts/ShopsContext"
import ErrorMessage from "./utils/ErrorMessage"

const ShopList = () => {
    const [state, setState] = useState({ loading: false})
    const { shopState, dispatch } = useContext(ShopsContext)

    const setLoading = (status) =>{
        setState({...state, loading: status})
    } 

    useEffect( ()=> {
        setLoading(true)
        getShops(dispatch).then(()=>{
            setLoading(false)     
        })
        .catch(()=>{
            setLoading(false)     
        })    
        //eslint-disable-next-line
    }, [])

    if (shopState.error) {
        return (<ErrorMessage message={shopState.error}/>) 
    }
    else {

        return (
           
                 <div className="row justify-content-center">
                    {
                        shopState.shops && shopState.shops.map( (shop) => (
                            <Shop key={shop.id} {...shop}/>
                        )) 
                    }
                   
                
            </div>

        )

    }
  
}

export default ShopList
