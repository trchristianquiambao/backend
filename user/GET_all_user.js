exports.GET_all_user = (req, res, _dbConnection) => {
  const dbConnection = _dbConnection;

  let resp;

  const getAllUser = (page, limit, sortBy, callback) => {
    const sortField = sortBy || "user_fname";
    const offset = (page - 1) * limit;

    const sql = `
      SELECT * FROM user_tbl 
      WHERE user_isdel = 0
      ORDER BY ${sortField} ASC
      LIMIT ? OFFSET ?`;

    dbConnection.query(sql, [limit, offset], (err, recordset) => {
      if (err) {
        console.log(err);
        callback(err, null);
      }

      let allUserList = [];

      for (let index in recordset) {
        let allUser = {
          user_id: recordset[index].user_id,
          user_fname: recordset[index].user_fname,
          user_lname: recordset[index].user_lname,
        };

        allUserList.push(allUser);
      }

      callback(null, allUserList);
    });
  };

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sortBy = req.query.sortBy;

  getAllUser(page, limit, sortBy, (err, allUser) => {
    if (err) {
      const error = {
        status: "500",
        message: "Internal Server Error",
      };
      return res.status(500).send(error);
    }

    if (allUser.length !== 0) {
      resp = {
        status: "200",
        page: page,
        limit: limit,
        totalUsers: allUser.length,
        allUser: allUser,
      };
    } else {
      resp = {
        status: "204",
        message: "No Data Available!",
      };
    }

    res.status(resp.status === "200" ? 200 : 204).send(resp);
  });
};
