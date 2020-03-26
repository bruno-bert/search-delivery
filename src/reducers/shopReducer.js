export const Actions = {
    GET_ALL : "SIGNIN", 
    SET_ERROR: "SET_ERROR",
    CLEAR_ERROR: "CLEAR_ERROR"
}

export const shopReducer = (state, action) => {
    switch(action.type){
        case Actions.GET_ALL:
            return {...state, shops: action.payload.shops, error: null}

        case Actions.SET_ERROR: 
            return {...state, shops: null, error: action.payload.error }    

            case Actions.CLEAR_ERROR: 
            return {...state, error: null }    


        default: 
            return state;    

    }
}