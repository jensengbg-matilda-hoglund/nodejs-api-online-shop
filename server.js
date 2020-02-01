const express = require("express");
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("database.json");
const app = express();
const database = lowdb(adapter);
const port = process.env.PORT || 3000;

const initiateDatabase = () => {
  const hasProducts = database.has("products").value();
  const hasCart = database.has("cart").value();

  if (!hasProducts) {
    database.defaults({ products: [], cart: [] }).write();
  }

  if (!hasCart) {
    database.defaults({ products: [], cart: [] }).write();
  }
};

app.listen(port, () => {
  console.log("Server started on port: ", port);
  initiateDatabase();
});

module.exports = app;
