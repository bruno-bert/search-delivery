/** create user */
db.createUser({
  user: "admin",
  pwd: "12345",
  roles: [
    { role: "readWrite", db: "delivery" },
    { role: "dbAdmin", db: "delivery" }
  ]
});

/** create the collections */
db.createCollection("cities");
db.createCollection("segments");
db.createCollection("users");
db.createCollection("tokens");
db.createCollection("states");
db.createCollection("raws");
db.createCollection("shops");

/** create indexes */
db.segments.createIndex({ name: 1 }, { name: "name_index", unique: true });
db.users.createIndex({ email: 1 }, { name: "email_index", unique: true });
db.tokens.createIndex({ token: 1 }, { name: "token_index", unique: true });
db.shops.createIndex({ location: "2dsphere" }, { name: "geo_index" });
db.raws.createIndex({ place_id: 1 }, { name: "place_id_index", unique: true });
