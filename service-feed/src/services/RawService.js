import Raw from "../models/Raw";

export default class RawService {
  async create(content) {
    const exists = await Raw.exists({ place_id: content.place_id });

    if (!exists) {
      return await Raw.create(content);
    } else return { place_id: content.place_id, duplicated: true };
  }
}
