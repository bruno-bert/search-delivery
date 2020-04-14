const JOB_KEY = "GetDataFromGooglePlaces";
import Queue from "../lib/Queue";

const options = { repeat: { cron: process.env.JOB_REPEAT_EXPRESSION } };

export default {
  key: JOB_KEY,
  //options,
  async handle({ data }) {
    const { jobData, mailData } = data;
    console.log("job data", jobData);
    await Queue.add("SendMailToAdmin", { mailData });
    console.log(JOB_KEY + " - ran successfully");
  }
};
