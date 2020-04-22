import Raw from "../models/Raw";

export default class RawService {
  async getValid() {
    let filter = {
      requestedToDelete: false,
      notDelivery: false,
      badService: false
      //$text: { $search: "Marcilene" }
    };

    //const docs = await Raw.find({ $text: { $search: "Marcilene" } }).lean();
    const docs = await Raw.find(filter).lean();
    return docs;
  }

  async create(content) {
    const doc = await Raw.findOne({ place_id: content.place_id });

    const supportFields = {
      requestedToDelete: false,
      badSevice: false,
      notDelivery: false
    };

    if (!doc) {
      //create data
      await Raw.create({ ...content, ...supportFields, new: true });
      console.log(`${content.name} - item added`);
      return { place_id: content.place_id, new: true };
    } else {
      //update existing data if conditions are met (was not requested to delete and not bad service and not marked as nont delivery service)
      if (!doc.requestedToDelete && !doc.notDelivery && !doc.badService) {
        await doc.updateOne({ ...content });
        await doc.save();
        console.log(`${content.name} - item updated`);
      } else {
        console.log(`${content.name} - item marked to not update`);
      }
      return { place_id: content.place_id, updated: true };
    }
  }

  async update(place_id, content) {
    const doc = await Raw.findOne({ place_id: place_id });
    await doc.updateOne({ ...content });
    await doc.save();
    return { place_id, updated: true };
  }
}
