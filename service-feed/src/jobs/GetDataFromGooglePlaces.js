import Queue from "../lib/Queue";
import CityService from "../services/CityService";
import GoogleService from "../services/GoogleService";
import RawService from "../services/RawService";
import google from "../config/google";
const JOB_KEY = "GetDataFromGooglePlaces";
//const options = { repeat: { cron: process.env.JOB_REPEAT_EXPRESSION } };

import axios from "axios";

const types = [
  "restaurant",
  "bakery",
  "liquor_store",
  "cafe",
  "drugstore",
  "grocery_or_supermarket",
  "veterinary_care",
  "supermarket",
  "store",
  "pharmacy",
  "pet_store",
  "meal_takeaway",
  "meal_delivery"
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
  key: JOB_KEY,
  //options: {},
  async handle({ data }) {
    const { jobData, mailData } = data;
    const cityService = new CityService();
    const googleService = new GoogleService();
    const rawService = new RawService();
    let page_token = null;
    let googleData = null;

    const cities = await cityService.list();

    console.log(`${cities.length} cities listed...`);

    for (const city of cities) {
      console.log(`Getting data from city : ${city.name} ...`);

      let filter = {};
      let initFilter = {
        lat: city.lat,
        lng: city.lng,
        radius: 20000
      };
      let idx = 0;

      for (const type of types) {
        //adds the "type" to the filter
        initFilter = { ...initFilter, type };

        console.log(`Received Todo ${idx + 1}:`);
        idx += 1;

        do {
          console.log(`Getting data from Google Places API...type: ${type}`);

          filter = !page_token ? initFilter : { page_token };
          googleData = await googleService.get(filter);
          page_token = googleData.next_page_token;

          if (googleData.results && googleData.results.length > 0) {
            googleData.results.forEach(async content => {
              await rawService.create(content);
            });

            console.log(
              `Waiting ${String(google.waitBetweenRequests / 1000)} seconds...`
            );

            await sleep(google.waitBetweenRequests);
          }
        } while (page_token);

        console.log(`Finished type ${type}`);
      }

      console.log(`Finished city ${city.name}`);
    }

    console.log("Finished!");

    if (jobData.sendMailToAdmin)
      await Queue.add("SendMailToAdmin", { mailData });

    //console.log(JOB_KEY + " - ran successfully");
  }
};
