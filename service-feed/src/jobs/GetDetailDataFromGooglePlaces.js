import Queue from "../lib/Queue";
import GoogleService from "../services/GoogleService";
import RawService from "../services/RawService";
import google from "../config/google";
const JOB_KEY = "GetDetailDataFromGooglePlaces";
//const options = { repeat: { cron: process.env.JOB_REPEAT_EXPRESSION } };

import axios from "axios";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
  key: JOB_KEY,
  //options: {},
  async handle({ data }) {
    const { jobData, mailData } = data;
    const rawService = new RawService();
    const googleService = new GoogleService();
    let googleData = null;

    const places = await rawService.getValid();

    console.log(`${places.length} places listed...`);

    for (let place of places) {
      console.log(`Getting data from place : ${place.name} ...`);
      googleData = await googleService.getDetail(place.place_id);

      if (googleData.result) {
        await rawService.update(place.place_id, googleData.result);
        console.log("added contact information");
      }

      console.log(
        `Waiting ${String(google.waitBetweenRequests / 1000)} seconds...`
      );

      await sleep(google.waitBetweenRequests);
    }

    console.log("Finished!");

    if (jobData.sendMailToAdmin)
      await Queue.add("SendMailToAdmin", { mailData });

    console.log(JOB_KEY + " - ran successfully");
  }
};
