import City from "../models/City";

export default class CityService {
  async list(status = "1") {
    return await City.find({ status });
  }
}
