'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddRawSchema extends Schema {
  up () {
    this.create("raw", collection => {
      collection.index("place_id_index", { place_id: 1 }, { unique: true });
    });
  }

  down () {
    this.drop('raw')
  }
}

module.exports = AddRawSchema
