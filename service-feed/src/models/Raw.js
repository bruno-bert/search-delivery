import { database } from "../lib/Database";
const mongoose = database.provider();

const RawSchema = new mongoose.Schema(
  {
    place_id: {
      type: String
    }
  },
  { strict: false }
);
const Raw = mongoose.model("Raw", RawSchema);
module.exports = Raw;
