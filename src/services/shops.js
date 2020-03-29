import firebase from "../firebase/config";
import { Actions } from "../reducers/shopReducer";

import { convertMoneyToDisplay } from "../utils";

const COLLECTION_NAME = "shops";

export const SHOPS_CONFIG = {
  PAGINATION_SIZE: 10
};

export const cleanError = dispatch => {
  dispatch({ type: Actions.CLEAR_ERROR, payload: { error: null } });
};

export const clearData = dispatch => {
  dispatch({ type: Actions.CLEAR_DATA });
};

const prepareDataToDisplay = (id, data) => {
  return {
    ...data,
    id,
    rate: convertMoneyToDisplay(data.rateToDelivery, data.rateCurrency),
    rating: Number(data.rating).toFixed(1)
  };
};

export const getShops = async (
  dispatch,
  name = null,
  lastDoc = null,
  append = false
) => {
  let query = null;
  const collection = firebase.firestore().collection(COLLECTION_NAME);

  /** filters */
  if (name) query = collection.where("name", "==", name);
  else query = collection;

  /* sort and limit */
  query = query.orderBy("rating", "desc").limit(SHOPS_CONFIG.PAGINATION_SIZE);

  /** pagination */
  if (lastDoc) {
    query = query.startAfter(lastDoc);
  }

  query
    .get()
    .then(snapshot => {
      const docs = snapshot.docs.map(doc => {
        const data = prepareDataToDisplay(doc.id, doc.data());
        return data;
      });

      dispatch({
        type: append ? Actions.APPEND_DATA : Actions.GET_DATA,
        payload: {
          shops: docs,
          lastDoc: snapshot.docs[snapshot.docs.length - 1],
          empty: snapshot.docs.length === 0
        }
      });

      return docs;
    })
    .catch(err => {
      console.log(err.message);
      dispatch({
        type: Actions.SET_ERROR,
        payload: { error: `Function getShops: ${err.message}` }
      });
      return err;
    });
};
