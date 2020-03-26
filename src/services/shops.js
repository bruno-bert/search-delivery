import firebase from "../firebase/config";
import { Actions } from "../reducers/shopReducer"

export const cleanError = (dispatch) => {
    dispatch({type: Actions.CLEAR_ERROR, payload: { error: null } })    
}


export const getShops = async ( dispatch) => {
    firebase.firestore().collection('shops').get()
    .then((snapshot) =>{
        const docs = snapshot.docs.map( (doc)=>  {
            /** TODO - get referenced objects directly from firebase (city, segment */
            const  data = doc.data() 
            const tmpContact  ={ type: "Whatsapp", content: "(12) 99122-9818"}
            return { ...data, id: doc.id, city: data.cityId.id, contacts: [tmpContact,tmpContact], segment: data.segment.id } 
        } )
        console.log(docs)
        dispatch({type: Actions.GET_ALL, payload: { shops: docs } })
        return docs;
    })    
    .catch(err => {
        console.log(err.message);
        dispatch({type: Actions.SET_ERROR, payload: { error: err.message } })          
        return err;
    });
}

