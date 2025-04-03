const GET_all_user = require("../user/GET_all_user");
const GET_user = require("../user/GET_user");
const POST_user = require("../user/POST_user");
const PUT_user = require("../user/PUT_user");

module.exports.init = (server, dbConnection) => {
  // Endpoint for fetching all users
  server.get("/api/user", (req, res) => {
    GET_all_user.GET_all_user(req, res, dbConnection);
    console.info("GET_all_user executed");
  });

  // Endpoint for fetching a single user by ID
  server.get("/api/user/:userId", (req, res) => {
    GET_user.GET_user(req, res, dbConnection);
    console.info(`GET_user executed for userId: ${req.params.userId}`);
  });

  // Endpoint for creating a new user
  server.post("/api/user", (req, res) => {
    POST_user.POST_user(req, res, dbConnection);
    console.info("POST_user executed");
  });

  // Endpoint for updating a user by ID
  server.put("/api/user/:userId", (req, res, next) => {
    PUT_user.PUT_user(req, res, dbConnection, next);
    console.info(`PUT_user executed for userId: ${req.params.userId}`);
  });
};
