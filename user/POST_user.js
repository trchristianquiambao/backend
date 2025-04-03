exports.POST_user = function (req, res, _dbConnection) {
  const body = req.body;
  console.log("Creating user with body: ", body);

  const sqlQuery = `INSERT INTO user_tbl (user_fname, user_lname, user_isdel) VALUES (?, ?, ?)`;
  const sqlData = [body.user_fname, body.user_lname, body.user_isdel];

  console.log("SQL Query: ", sqlQuery);
  console.log("SQL Data: ", sqlData);  // Check the data being passed

  _dbConnection.query(sqlQuery, sqlData, (err, result) => {
    if (err) {
      console.error("Error executing query: ", err);
      return res.status(500).send({
        status: "500",
        message: "Internal Server Error: Failed to create user",
      });
    }

    res.status(200).send({
      status: "200",
      message: "User created successfully",
      userId: result.insertId,
    });
  });
};
