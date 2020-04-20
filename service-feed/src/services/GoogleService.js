import google from "../config/google";
import { v4 as uuidv4 } from "uuid";

import axios from "axios";

export default class GoogleService {
  async get({
    page_token,
    lat,
    lng,
    radius = 20000,
    type = "establishment",
    language = "pt-BR"
  }) {
    let filter = !page_token
      ? `location=${lat},${lng}&radius=${radius}&language=${language}&type=${type}`
      : `pagetoken=${page_token}`; //&request_count=${uuidv4()}`;
    const url = `${google.textSearchBaseUrl}?${filter}&key=${google.clientApiKey}`;
    console.log(url);
    return axios
      .get(url)
      .then(result => {
        return result.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
}
