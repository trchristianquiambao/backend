exports.GET_user = (req, res, _dbConnection) => {
  //initialize database connection
  dbConnection = _dbConnection;

  //initialize response
  var resp;

  //fetch userId in parameter this will fetch an userId parameter in the url
  var params = {
    userId: req.params.userId,
  };

  //getUser fn
  //-------------
  const getUser = (params, callback) => {
    //declare userId
    var userId = params.userId;

    //sql command
    //this will search for the user with the id that we pass
    var sql =
      "SELECT * FROM user_tbl WHERE user_isdel = 0 AND user_id = " + userId;

    //executing sql
    dbConnection.query(sql, function (err, recordset) {
      //check error on fetching
      if (err) {
        console.log("error: getUser Error : " + err);
        callback(err, null);
      }

      //initalize userResponse
      var userRes = null;

      //check if there's record
      if (recordset.length !== 0) {
        //this will save the first recordset to the userRes object
        userRes = {
          user_id: recordset[0].user_id,
          user_fname: recordset[0].user_fname,
          user_lname: recordset[0].user_lname,
          user_isdel: recordset[0].user_isdel,
        };
      }

      //return userRes object
      callback(null, userRes);
    });
  };

  //Call get user fn
  getUser(params, (err, user) => {
    //if the callback returns an err, the server will display error
    if (err) {
      let err = {};
      err.status = "500";
      err.message = "Internal Server Error";
      res.send(err);
    }

    //check if there's fetched data
    if (user !== null) {
      resp = { status: "200", user: user };
    } else {
      //else if empty
      resp = { status: "204", message: "No Data Available!" };
    }

    //send response
    res.send(resp);
  });
};
