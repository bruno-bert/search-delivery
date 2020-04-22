import { database } from "../lib/Database";
const mongoose = database.provider();

const RawSchema = new mongoose.Schema(
  {
    place_id: {
      type: String
    },
    last_update: { type: Date, default: Date.now }
  },
  { strict: false }
);
const Raw = mongoose.model("Raw", RawSchema);
module.exports = Raw;
