console.log("Server JavaScript start");

// setup database connection and routing
require("dotenv").config();
const pool = require("./utils/mysqlPool").pool;
const app = require("./api/index");

// listen for incoming connections
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is listening on port", port, "\n");
});