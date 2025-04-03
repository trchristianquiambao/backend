exports.GET_user = (req, res, _dbConnection) => {
  const dbConnection = _dbConnection;
  let resp;

  const params = {
    userId: req.params.userId,
  };

  const getUser = (params, callback) => {
    const userId = params.userId;
    const sql = "SELECT * FROM user_tbl WHERE user_isdel = 0 AND user_id = ?";

    dbConnection.query(sql, [userId], (err, recordset) => {
      if (err) {
        console.log("getUser Error:", err);
        callback(err, null);
      }

      let userRes = null;
      if (recordset.length !== 0) {
        userRes = {
          user_id: recordset[0].user_id,
          user_fname: recordset[0].user_fname,
          user_lname: recordset[0].user_lname,
          user_isdel: recordset[0].user_isdel,
        };
      }

      callback(null, userRes);
    });
  };

  getUser(params, (err, user) => {
    if (err) {
      const error = {
        status: "500",
        message: "Internal Server Error",
      };
      return res.status(500).send(error);
    }

    if (user !== null) {
      resp = { status: "200", user: user };
    } else {
      resp = { status: "204", message: "No Data Available!" };
    }

    res.status(resp.status === "200" ? 200 : 204).send(resp);
  });
};
