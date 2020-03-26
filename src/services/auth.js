import firebase from "../firebase/config";
import { AuthActions } from "../reducers/authReducer"


export const listenAuthenticationChanges = (dispatch)=>{
    firebase.auth().onAuthStateChanged((user)=>{
        /** since fb persists the login, the application must chek if user is already logged in */
        if ( user ) {

            console.log(user.displayName)
            if (!user.displayName) {
                user = { ...user, displayName: user.email }
            }
                
                
            dispatch({type: AuthActions.SIGNIN, payload: { user } })
        }          
         
        
    })
}

export const cleanAuthError = (dispatch) => {
    dispatch({type: AuthActions.CLEAR_ERROR, payload: { authError: null } })    
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


export const loginWithGoogle = async ( dispatch) => {
 
    const user = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then( response => {
        
        /** saves the other info related to the user */
        if (response.additionalUserInfo.isNewUser){
          
               firebase.firestore().collection('users').doc(response.user.uid).set({
                        fullName: response.additionalUserInfo.profile.name
                    })
        }

        dispatch({type: AuthActions.SIGNIN, payload: { user: response.user } })
    })
    .catch(err => {
        dispatch({type: AuthActions.AUTH_ERROR, payload: { authError: err.message } })  
        console.log(err.message);
        return err;
    });
   
    return user;
}

export const signup = async ( { email, password, confirmPassword, name }, dispatch) => {

  
    if (password !== confirmPassword ) {
       // TODO Localization
        let err = "Senha deve ser igual a Confirmação de Senha"
        dispatch({type: AuthActions.AUTH_ERROR, payload: { authError: err } }) 
        return err; 
    }

    const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( response => {
        
        /** saves the other info related to the user */
        firebase.firestore().collection('users').doc(response.user.uid).set({
            fullName: name
        })

        response.user.updateProfile({
            displayName: name
         }).then(
           (s)=>{
            dispatch({type: AuthActions.SIGNUP, payload: { user: { ...response.user, displayName: name} } })
           } 
         ).catch( err => {
            dispatch({type: AuthActions.AUTH_ERROR, payload: { authError: err } }) 
            return err; 
         });


       
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

