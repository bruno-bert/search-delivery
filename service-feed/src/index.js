import "dotenv/config";
import {
  GetDataFromGooglePlaces,
  GetDetailDataFromGooglePlaces,
  GetLinks
} from "./jobs";

import { database } from "./lib/Database";

const run = async () => {
  database.connect();

  /*
  await GetDataFromGooglePlaces.handle({
    data: { jobData: { sendMailToAdmin: false }, mailData: {} }
  });

  await GetDetailDataFromGooglePlaces.handle({
    data: { jobData: { sendMailToAdmin: false }, mailData: {} }
  });*/

  await GetLinks.handle({
    data: { jobData: { sendMailToAdmin: false }, mailData: {} }
  });

  //database.disconnect();
};

run();
