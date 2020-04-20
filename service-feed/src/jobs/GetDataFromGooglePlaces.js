import Queue from "../lib/Queue";
import CityService from "../services/CityService";
import GoogleService from "../services/GoogleService";
import RawService from "../services/RawService";
import google from "../config/google";
const JOB_KEY = "GetDataFromGooglePlaces";
//const options = { repeat: { cron: process.env.JOB_REPEAT_EXPRESSION } };

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

    //cities.forEach(city => {
    const city = cities.filter(city => city.name === "Taubaté")[0];

    let filter = {};
    let initFilter = {
      lat: city.lat,
      lng: city.lng,
      radius: 20000,
      type: "restaurant"
    };

    do {
      console.log("Getting data from Google Places API...");

      filter = !page_token ? initFilter : { page_token };
      googleData = await googleService.get(filter);
      page_token = googleData.next_page_token;

      if (googleData.status === "INVALID_REQUEST") {
        console.warn("Invalid request to google...");
      } else {
        let result = null;
        googleData.results.forEach(async content => {
          result = await rawService.create(content);
          console.log(result);
        });

        console.log(
          `Waiting ${String(google.waitBetweenRequests / 1000)} seconds...`
        );
        await sleep(google.waitBetweenRequests);
      }
    } while (page_token);

    // });

    if (jobData.sendMailToAdmin)
      await Queue.add("SendMailToAdmin", { mailData });

    //console.log(JOB_KEY + " - ran successfully");
  }
};
