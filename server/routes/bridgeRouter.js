const express = require("express");
const router = express.Router();
const pool = require("./config/connectionPool");

const queryConfig = require("./query/bridgeQuery");

const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

let staCalc = (point) => {
  let _point = point.split("+");
  let firstPoint = parseFloat(_point[0]) * 1000;
  let secondPoint = parseFloat(_point[1]);

  return firstPoint + secondPoint;
};

// 모든 교량 조회(GET-SELECT)
router.get("/bridges", (req, res) => {
  let _query = queryConfig.findByAll();
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

// 한개 교량 조회
router.get("/bridges/:id", (req, res) => {
  let { id } = req.params;
  console.log(id);
  let _query = queryConfig.findById();
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

// 교량 추가(INSERT)
router.post("/bridges", (req, res) => {
  let { body: reqBody } = req;
  let {
    bridgeIndex,
    bridgeName,
    startPoint,
    endPoint,
    form,
    location,
    commSeq,
    codeIndex,
  } = reqBody;

  // 제원 계산
  let _startPoint = staCalc(startPoint);
  let _endPoint = staCalc(endPoint);

  let spec = _endPoint - _startPoint;

  let data = {
    created_date: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
    bridge_index: bridgeIndex,
    bridge_nm: bridgeName || null,
    form: form || null,
    location: location,
    start_point: startPoint || "0+000",
    end_point: endPoint || "0+000",
    spec: spec || 0,
    comm_seq: commSeq,
    code_index: codeIndex || null,
  };

  let _query = queryConfig.insertOfInfo();
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

// 교량 정보 수정(UPDATE)
router.put("/bridges/:id", (req, res) => {
  let { id } = req.params;
  let { body: reqBody } = req;
  let {
    bridgeName,
    startPoint,
    endPoint,
    form,
    location,
    commSeq,
    codeIndex,
  } = reqBody;

  // 제원 계산
  let _startPoint = staCalc(startPoint);
  let _endPoint = staCalc(endPoint);

  let spec = _endPoint - _startPoint;

  let data = {
    modified_date: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
    bridge_nm: bridgeName || null,
    form: form || null,
    location: location,
    start_point: startPoint || "0+000",
    end_point: endPoint || "0+000",
    spec: spec || 0,
    comm_seq: commSeq,
    code_index: codeIndex || null,
  };
  let updateData = [];
  updateData[0] = data;
  updateData[1] = id;

  let _query = queryConfig.updateOfInfo();
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

// 교량 정보 수정(UPDATE)
router.delete("/bridges/:id", (req, res) => {
  let { id } = req.params;

  let _query = queryConfig.deleteOfInfo();
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

/** 교량 관리 이력 (table: bridge_view) */

// 교량 관리이력 조회(GET-SELECT)
router.get("/logs", (req, res) => {
  let _query = queryConfig.findByLog();
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

router.get("/logs/:id", (req, res) => {
  let { id } = req.params;
  console.log(id);
  let _query = queryConfig.findByLogId();
  console.log(_query);
  pool.getConnection((err, connection) => {
    if (err) {
      res.status(err.status).end();
      throw new Error("Response Error!!");
    } else {
      connection.query(_query, id, (err, results) => {
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

// 교량 관리이력 추가(INSERT)
router.post("/logs", (req, res) => {
  let { body: reqBody } = req;
  let { writer, bridgeIndex, manager, safetyChk, description } = reqBody;

  let data = {
    created_date: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
    writer: writer || null,
    bridge_index: bridgeIndex || null,
    manager: manager || null,
    safety_chk: safetyChk || null,
    description: description || null,
  };
  let _query = queryConfig.insertOfLog();
  pool.getConnection((err, connection) => {
    if (err) {
      res.status(err.status).end();
      throw new Error("Response Error!!");
    } else {
      connection.query(_query, data, (err, results) => {
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

module.exports = router;
