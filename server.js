const database = require("./database-op.js");
const app = require("./endpoints.js");
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server started on port: ", port);
  database.initiateDatabase();
});
