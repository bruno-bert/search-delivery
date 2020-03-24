export const AuthActions = {
    SIGNIN : "SIGNIN",
    SIGNUP : "SIGNUP",
    SIGNOUT : "SIGNOUT",
    AUTH_ERROR: "AUTH_ERROR",
    CLEAR_ERROR: "CLEAR_ERROR"
}

export const firebaseAuth = (state, action) => {
    switch(action.type){
        case AuthActions.SIGNUP:
            return {...state, user: action.payload.user, isAuthenticated: true, authError: null}

        case AuthActions.SIGNIN:
            return {...state, user: action.payload.user, isAuthenticated: true, authError: null}
            
        case AuthActions.SIGNOUT: 
            return {...state, user: null, isAuthenticated: false, authError: null}   

        case AuthActions.AUTH_ERROR: 
            return {...state, user: null, isAuthenticated: false, authError: action.payload.authError }    

            case AuthActions.CLEAR_ERROR: 
            return {...state, authError: null }    


        default: 
            return state;    

    }
}