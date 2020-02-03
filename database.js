const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("database.json");
const database = lowdb(adapter);

exports.initiateDatabase = () => {
  const hasProducts = database.has("products").value();
  const hasCart = database.has("cart").value();

  if (!hasProducts) {
    database.defaults({ products: [], cart: [] }).write();
  }

  if (!hasCart) {
    database.defaults({ products: [], cart: [] }).write();
  }
};
