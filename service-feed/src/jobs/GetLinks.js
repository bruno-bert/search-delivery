import Queue from "../lib/Queue";
import RawService from "../services/RawService";
import { isString, isNumber } from "util";
import google from "../config/google";

const JOB_KEY = "GetLinks";
//const options = { repeat: { cron: process.env.JOB_REPEAT_EXPRESSION } };

const puppeteer = require("puppeteer");
//import axios from "axios";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getCityFromAddress(address) {
  const components = String(address).split(",");
  const length = components.length;
  const checkCep = String(components[length - 1]).trim()[0];

  if (isNaN(checkCep)) return components[length - 1];
  else return components[length - 2];
}

export default {
  key: JOB_KEY,
  //options: {},
  async handle({ data }) {
    const { jobData, mailData } = data;
    const rawService = new RawService();

    (async () => {
      let placeDescription;
      let link;
      let city;
      const selector = "#search div.g a";
      const term = "(site:www.facebook.com AND inurl:about)";

      const browser = await puppeteer.launch({
        headless: false
      });
      const page = await browser.newPage();

      await page.goto(`https://google.com`, { waitUntil: "networkidle0" });

      const docs = await rawService.getValid();
      const places = docs.slice(0, 3);

      for (let place of places) {
        city = place.city || getCityFromAddress(place.formatted_address);
        placeDescription = `"${place.name}" ${city}`;

        //type the search on google search bar

        await page.type("input[name=q]", `${term} ${placeDescription}`, {
          delay: 100
        });

        //press enter to activate the search
        await page.keyboard.press("Enter");

        //wait until search results page is available
        await page.waitForSelector(selector);

        //get list of links on search results
        const links = await page.$$eval(selector, anchors => {
          return anchors.map(a => {
            return a.href;
          });
        });

        if (links && links.length > 0) link = links[0];
        else link = "not found";
        await rawService.update(place.place_id, {
          facebookAboutUrl: link,
          city
        });
        console.log("Place: " + place.name + " - link found: " + link);

        console.log(
          `Waiting ${String(google.waitBetweenSearches / 1000)} seconds...`
        );

        await sleep(google.waitBetweenSearches);
      }

      await browser.close();
    })();

    console.log("Finished!");

    if (jobData.sendMailToAdmin)
      await Queue.add("SendMailToAdmin", { mailData });

    console.log(JOB_KEY + " - ran successfully");
  }
};
