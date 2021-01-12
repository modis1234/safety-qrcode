const express = require("express");
const router = express.Router();
const pool = require("./config/connectionPool");

const queryConfig = require("./query/configQuery");

const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

const INFO_WORKER = "info_worker";

// 모든 작업자 조회(GET-SELECT)
router.get("/workers", (req, res) => {
  let _query = queryConfig.findByAll(INFO_WORKER);

  pool.getConnection((err, connection) => {
    if (err) {
      res.status(err.status).end();
      throw new Error("Response Error!!");
    } else {
      connection.query(_query, (err, results) => {
        if (err) {
          res.status(404).end();
          throw err;
        } else {
          res.json(results);
        }
      });
    }
    connection.release();
  });
});

// 작업자 1명 조회
router.get("/workers/:id", (req, res) => {
  let { id } = req.params;
  let _query = queryConfig.findById(INFO_WORKER);
  console.log(_query);
  pool.getConnection((err, connection) => {
    if (err) {
      res.status(err.status).end();
      throw new Error("Response Error!!");
    } else {
      connection.query(_query, id, (err, results, field) => {
        if (err) {
          res.status(404).end();
          throw err;
        } else {
          let resResult = results.map((result) => {
            result["created_date"] = moment(result["created_date"]).format(
              "YYYY-MM-DD HH:mm:ss"
            );
            return result;
          });
          res.json(resResult);
        }
      });
    }
    connection.release();
  });
});

router.post("/workers", (req, res) => {
  let {
    workerNM,
    workerDept,
    workerPst,
    workerTel,
    workerBirth,
    workerSex,
    bloodGroup,
    bloodType,
    codeIndex,
  } = req.body;

  let data = {
    created_date: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
    worker_nm: workerNM,
    worker_dept: workerDept,
    worker_pst: workerPst,
    worker_tel: workerTel,
    worker_birth: workerBirth,
    worker_sex: workerSex,
    blood_group: bloodGroup,
    blood_type: bloodType,
    code_index: codeIndex,
  };
  let _query = queryConfig.insert(INFO_WORKER);
  pool.getConnection((err, connection) => {
    if (err) {
      res.status(err.status).end();
      throw new Error("Response Error!!");
    } else {
      connection.query(_query, data, (err, results, field) => {
        if (err) {
          res.status(404).end();
          throw err;
        } else {
          res.json(results);
        }
      });
    }
    connection.release();
  });
});

router.put("/workers/:id", (req, res) => {
  let { id } = req.params;
  let {
    workerNM,
    workerDept,
    workerPst,
    workerTel,
    workerBirth,
    workerSex,
    bloodGroup,
    bloodType,
    codeIndex,
  } = req.body;

  let data = {
    modified_date: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
    worker_nm: workerNM,
    worker_dept: workerDept,
    worker_pst: workerPst,
    worker_tel: workerTel,
    worker_birth: workerBirth,
    worker_sex: workerSex,
    blood_group: bloodGroup,
    blood_type: bloodType,
    code_index: codeIndex,
  };

  let updateData = [];
  updateData[0] = data;
  updateData[1] = id;

  let _query = queryConfig.update(INFO_WORKER);
  pool.getConnection((err, connection) => {
    if (err) {
      res.status(err.status).end();
      throw new Error("Response Error!!");
    } else {
      connection.query(_query, updateData, (err, results, field) => {
        if (err) {
          res.status(404).end();
          throw err;
        } else {
          res.json(results);
        }
      });
    }
    connection.release();
  });
});

// 작업자 정보 삭제(DELETE)
router.delete("/workers/:id", (req, res) => {
  let { id } = req.params;

  let _query = queryConfig.delete(INFO_WORKER);
  pool.getConnection((err, connection) => {
    if (err) {
      res.status(err.status).end();
      throw new Error("Response Error!!");
    } else {
      connection.query(_query, id, (err, results, field) => {
        if (err) {
          res.status(404).end();
          throw err;
        } else {
          res.json(results);
        }
      });
    }
  });
});

module.exports = router;
