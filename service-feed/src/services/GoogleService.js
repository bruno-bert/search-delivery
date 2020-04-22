import google from "../config/google";

import axios from "axios";

export default class GoogleService {
  async getDetail(place_id) {
    let filter = `place_id=${place_id}&fields=formatted_phone_number`;
    const url = `${google.detailsSearchBaseUrl}?${filter}&key=${google.clientApiKey}`;

    return axios
      .get(url)
      .then(result => {
        if (result.data.status === "INVALID_REQUEST")
          console.warn(`Invalid request to google...`);

        return result.data;
      })
      .catch(err => {
        console.log(err);
      });
  }

  async get({
    page_token,
    lat,
    lng,
    radius = 20000,
    type,
    language = "pt-BR"
  }) {
    let filter = !page_token
      ? `location=${lat},${lng}&radius=${radius}&language=${language}&type=${type}`
      : `pagetoken=${page_token}`; //&request_count=${uuidv4()}`;
    const url = `${google.textSearchBaseUrl}?${filter}&key=${google.clientApiKey}`;

    return axios
      .get(url)
      .then(result => {
        if (result.data.status === "INVALID_REQUEST")
          console.warn(`Invalid request to google...`);

        return result.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
}
