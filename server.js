require("dotenv").config();
const express = require("express");
const server = express();
const connection = require("./config/db-mysql");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swagger = require("./swagger");

server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.LOCAL_HOST);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

server.get("/hello", (req, res) => {
  res.send("Hello World");
});

connection.init((dbConnection) => {
  server.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`);
  });

  const loadModules = (server, dbConnection, callback) => {
    const modules = require("./api/api");
    modules.init(server, dbConnection);
    callback(null, { status: "success" });
  };

  loadModules(server, dbConnection, (err, resp) => {
    if (resp.status === "success") {
      console.log("---Main Modules Activated----");
    }
  });
});
