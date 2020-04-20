import { database } from "../lib/Database";
const mongoose = database.provider();

const CitySchema = new mongoose.Schema({
  name: {
    type: String
  },
  ibge: {
    type: String
  },
  capital: {
    type: String
  },
  uf: {
    type: String
  },
  lat: {
    type: String
  },
  lng: {
    type: String
  },
  last_update: {
    type: String
  },
  status: {
    type: String
  }
});

const City = mongoose.model("City", CitySchema);
module.exports = City;
