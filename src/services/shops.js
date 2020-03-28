import firebase from "../firebase/config";
import { Actions } from "../reducers/shopReducer"

import { convertMoneyToDisplay } from "../utils"


export const cleanError = (dispatch) => {
    dispatch({type: Actions.CLEAR_ERROR, payload: { error: null } })    
}


const handleData = ( id, data ) => {

    return { 
        ...data, 
        id, 
        rate: convertMoneyToDisplay( data.rateToDelivery, data.rateCurrency )
    } 


}

export const getShops = async ( dispatch) => {
    firebase.firestore().collection('shops').get()
    .then((snapshot) =>{
        const docs = snapshot.docs.map( (doc)=>  {
            const data  = handleData( doc.id, doc.data()  )
            return data
        } )
        dispatch({type: Actions.GET_ALL, payload: { shops: docs } })
        return docs;
    })    
    .catch(err => {
        console.log(err.message);
        dispatch({type: Actions.SET_ERROR, payload: { error: `Erro na função getShops: ${err.message}` } })          
        return err;
    });
}

