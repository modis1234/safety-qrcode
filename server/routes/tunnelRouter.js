const express = require("express");
const router = express.Router();
const pool = require("./config/connectionPool");

const queryConfig = require("./query/configQuery");

const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");


const COMM_TUNNEL = 'comm_tunnel';
const INFO_TUNNEL = 'info_tunnel';
const REC_TUNNEL_VIEW = 'rec_tunnel_view';
const LOG_TUNNEL = 'log_tunnel';


let staCalc = (point) => {
  let _point = point.split("+");
  let firstPoint = parseFloat(_point[0]) * 1000;
  let secondPoint = parseFloat(_point[1]);

  return firstPoint + secondPoint;
};

// 모든 터널 조회(GET-SELECT)
router.get("/tunnels", (req, res) => {
  let _query = queryConfig.findByAll(COMM_TUNNEL);
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

// 한개 터널 조회
router.get("/tunnels/:id", (req, res) => {
  let { id } = req.params;
  console.log(id);
  let _query = queryConfig.findById(COMM_TUNNEL, 'id');
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
          res.json(resResult[0]);
        }
      });
    }
    connection.release();
  });
});

// 터널 추가(INSERT)
router.post("/tunnels", (req, res) => {
  let { body: reqBody } = req;
  let {
    tunnelIndex,
    tunnelName,
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
    tunnel_index: tunnelIndex,
    tunnel_nm: tunnelName || null,
    form: form || null,
    location: location,
    start_point: startPoint || "0+000",
    end_point: endPoint || "0+000",
    spec: spec || 0,
    comm_seq: commSeq,
    code_index: codeIndex || null,
  };
  console.log(data);

  let _query = queryConfig.insert(INFO_TUNNEL);
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

// 터널 정보 수정(UPDATE)
router.put("/tunnels/:id", (req, res) => {
  let { id } = req.params;
  let { body: reqBody } = req;
  let {
    tunnelName,
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
    tunnel_nm: tunnelName || null,
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

  let _query = queryConfig.update(INFO_TUNNEL, 'id');
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

// 터널 정보 삭제(DELETE)
router.delete("/tunnels/:id", (req, res) => {
  let { id } = req.params;

  let _query = queryConfig.delete(INFO_TUNNEL, 'id');
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

/** 터널 관리 이력 (table: tunnel_view) */

// 터널 관리이력 조회(GET-SELECT)
router.get("/logs", (req, res) => {
  let _query = queryConfig.findByAll(REC_TUNNEL_VIEW);
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
  let _query = queryConfig.findById(REC_TUNNEL_VIEW, 'tunnel_seq');
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

// 터널 관리이력 추가(INSERT)
router.post("/logs", (req, res) => {
  let { body: reqBody } = req;
  let { writer, tunnelIndex, manager, safetyChk, description } = reqBody;

  let data = {
    created_date: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
    writer: writer || null,
    tunnel_index: tunnelIndex || null,
    manager: manager || null,
    safety_chk: safetyChk || null,
    description: description || null,
  };
  let _query = queryConfig.insert(LOG_TUNNEL);
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
