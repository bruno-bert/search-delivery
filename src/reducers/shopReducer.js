export const Actions = {
  GET_DATA: "GET_DATA",
  APPEND_DATA: "APPEND_DATA",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
  CLEAR_DATA: "CLEAR_DATA"
};

export const shopReducer = (state, action) => {
  switch (action.type) {
    case Actions.GET_DATA:
      return {
        ...state,
        shops: action.payload.shops,
        lastDoc: action.payload.lastDoc,
        error: null,
        empty: action.payload.empty
      };

    case Actions.APPEND_DATA:
      return {
        ...state,
        shops: [...state.shops, ...action.payload.shops],
        lastDoc: action.payload.lastDoc,
        error: null,
        empty: action.payload.empty
      };

    case Actions.SET_ERROR:
      return { ...state, shops: null, error: action.payload.error };

    case Actions.CLEAR_ERROR:
      return { ...state, error: null };

    case Actions.CLEAR_DATA:
      return { ...state, shops: null, lastDoc: null };

    default:
      return state;
  }
};
