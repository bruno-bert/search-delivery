export default {
  textSearchBaseUrl: process.env.GOOGLE_TEXTSEARCH_BASEURL,
  detailsSearchBaseUrl: process.env.GOOGLE_DETAILSEARCH_BASEURL,
  clientApiKey: process.env.GOOGLE_CLIENT_API_KEY,
  waitBetweenRequests: parseInt(process.env.GOOGLE_WAIT_BETWEEN_REQUESTS)
};
