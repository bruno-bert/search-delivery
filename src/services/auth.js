import firebase from "../firebase/config";
import { AuthActions } from "../reducers/authReducer"

export const listenAuthenticationChanges = (dispatch)=>{
    firebase.auth().onAuthStateChanged((user)=>{
        /** since fb persists the login, the application must chek if user is already logged in */
        if ( user )
         dispatch({type: AuthActions.SIGNIN, payload: { user } })
        
    })
}

export const login = async ( { email, password }, dispatch) => {
    const user = await firebase.auth().signInWithEmailAndPassword(email, password)
    .then( response => {
        dispatch({type: AuthActions.SIGNIN, payload: { user: response.user } })
    })
    .catch(err => {
        dispatch({type: AuthActions.AUTH_ERROR, payload: { authError: err.message } })  
        console.log(err.message);
        return err;
    });
   
    return user;
}

export const signup = async ( { email, password }, dispatch) => {
    const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( response => {
        dispatch({type: AuthActions.SIGNUP, payload: { user: response.user } })
    })
    .catch(err => {
        dispatch({type: AuthActions.AUTH_ERROR, payload: { authError: err.message } })  
        console.log(err.message);
        return err;
    });
   
    return user;
}

export const signout = async ( dispatch) => {
    const user = await firebase.auth().signOut()
    .then( () => {
        dispatch({type: AuthActions.SIGNOUT })
    })
    .catch(err => {
        dispatch({type: AuthActions.AUTH_ERROR, payload: { authError: err.message } })  
        console.log(err.message);
        return err;
    });
   
    return user;
}

