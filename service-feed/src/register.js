import "dotenv/config";
import Queue from "./lib/Queue";

const register = async () => {
  const jobData = {
    job: "GetDataFromGooglePlaces"
  };
  const mailData = {
    name: process.env.ADMIN_NAME,
    email: process.env.MAIL_SUPPORT,
    jobName: "GetDataFromGooglePlaces"
  };

  await Queue.add("GetDataFromGooglePlaces", { jobData, mailData });
};

register();
