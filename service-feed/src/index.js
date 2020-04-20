import "dotenv/config";
import { GetDataFromGooglePlaces } from "./jobs";

import { database } from "./lib/Database";

const run = async () => {
  database.connect();

  await GetDataFromGooglePlaces.handle({
    data: { jobData: { sendMailToAdmin: false }, mailData: {} }
  });

  database.disconnect();
};

run();
