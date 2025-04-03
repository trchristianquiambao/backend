const async = require("async");

exports.POST_user = (req, res, _dbConnection) => {
  const insertUser = (dbConnection, body, callback) => {
    const sqlData = [body.user_fname, body.user_lname];
    const sqlQuery =
      "INSERT INTO user_tbl (user_fname, user_lname, user_isdel) VALUES (?, ?, 0)";

    dbConnection.query(sqlQuery, sqlData, (err, result) => {
      if (err) {
        console.error("insertUser Error:", err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  };

  const validateCredentials = (body, callback) => {
    if (!body.user_fname) {
      callback(null, "User First Name is required");
    } else if (!body.user_lname) {
      callback(null, "User Last Name is required");
    } else {
      callback();
    }
  };

  const processUserInsertion = (req, res, _dbConnection, callback) => {
    const dbConnection = _dbConnection;
    let resp;

    async.waterfall(
      [
        (callback) => {
          validateCredentials(req.body, (err, result) => {
            if (result) {
              const error = { status: "204", message: result };
              callback(error, null);
            } else {
              callback();
            }
          });
        },
        (callback) => {
          insertUser(dbConnection, req.body, (err, result) => {
            if (err) {
              callback(err, null);
            } else {
              callback(null, result.insertId);
            }
          });
        },
      ],
      (err, userId) => {
        if (err) {
          callback(err, null);
        } else {
          resp = { status: "200", userId: userId };
          callback(null, resp);
        }
      }
    );
  };

  processUserInsertion(req, res, _dbConnection, (err, result) => {
    if (err) {
      const error =
        err.status !== "204"
          ? { status: "500", message: "Internal Server Error" }
          : err;
      res.status(500).send(error);
    } else {
      res.status(200).send(result);
    }
  });
};
