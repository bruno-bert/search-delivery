import mongoose from "mongoose";
import dbConfig from "../config/database";

class Database {
  provider() {
    return mongoose;
  }

  connect() {
    mongoose
      .connect(dbConfig.connectionString, dbConfig.connection.options)
      .then(() => {
        console.log(
          `Successfully Connected To Database ${dbConfig.connection.host}`
        );
      })
      .catch(err => {
        console.error("Error when trying to connect to database", err);
      });
    mongoose.Promise = global.Promise;
  }

  disconnect() {
    mongoose.disconnect();
  }
}

export let database = new Database();
