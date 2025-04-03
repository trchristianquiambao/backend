exports.PUT_user = (req, res, _dbConnection) => {
  const updateUser = (req, res, _dbConnection, callback) => {
    const body = req.body;
    let sqlData = [];
    let updateFields = [];

    if (Object.keys(body).length === 0) {
      return callback(
        { status: "400", message: "At least one field must be provided" },
        null
      );
    }

    if (body.user_fname) {
      updateFields.push("user_fname = ?");
      sqlData.push(body.user_fname);
    }

    if (body.user_lname) {
      updateFields.push("user_lname = ?");
      sqlData.push(body.user_lname);
    }

    if (body.user_isdel !== undefined) {
      updateFields.push("user_isdel = ?");
      sqlData.push(body.user_isdel);
    }

    if (updateFields.length === 0) {
      return callback(
        { status: "400", message: "No valid fields to update" },
        null
      );
    }

    let sqlQuery = `UPDATE user_tbl SET ${updateFields.join(
      ", "
    )} WHERE user_id = ?`;
    sqlData.push(req.params.userId);

    _dbConnection.query(sqlQuery, sqlData, (err, result) => {
      if (err) {
        console.error("Query Error:", err);
        return callback(
          { status: "500", message: "Internal Server Error" },
          null
        );
      }

      if (result.affectedRows === 0) {
        return callback(
          { status: "404", message: "User not found or no changes made" },
          null
        );
      }

      const selectQuery = "SELECT * FROM user_tbl WHERE user_id = ?";
      _dbConnection.query(
        selectQuery,
        [req.params.userId],
        (err, userResult) => {
          if (err) {
            console.error("Query Error:", err);
            return callback(
              { status: "500", message: "Internal Server Error" },
              null
            );
          }

          callback(null, {
            status: "200",
            message: "User updated successfully",
            user: userResult[0],
          });
        }
      );
    });
  };

  updateUser(req, res, _dbConnection, (err, result) => {
    if (err) {
      res.status(err.status || 500).send(err);
    } else {
      res.status(result.status || 200).send(result);
    }
  });
};
