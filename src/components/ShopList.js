import React, { useState, useEffect, useContext } from 'react'
import Shop from "./Shop"
import { getShops } from "../services/shops"
import { ShopsContext } from "../contexts/ShopsContext"

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

   
    return (
        <div>
            <ul>
                {
                    shopState.shops.map( (shop) => (
                        <Shop key={shop.id} {...shop}/>
                    )) 
                }
               
            </ul>
        </div>
    )
}

export default ShopList
