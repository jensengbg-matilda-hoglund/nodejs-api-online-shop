const database = require("./database.js");
const app = require("./app");
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server started on port: ", port);
  database.initiateDatabase();
});
