const express = require("express");
const router = express.Router();
const pool = require("./config/connectionPool");

const queryConfig = require("./query/configQuery");

const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

const COMM_EQUIPMENT = 'comm_equipment';
const INFO_EQUIPMENT = 'info_equipment';
const REC_EQUIPMENT_VIEW = 'rec_equipment_view';
const LOG_EQUIPMENT = 'log_equipment';


// 모든 장비 조회(GET-SELECT)
router.get("/equips", (req, res) => {
  let _query = queryConfig.findByAll(COMM_EQUIPMENT);

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

// 한개 장비 조회
router.get("/equips/:id", (req, res) => {
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

// 장비 추가(INSERT)
router.post("/equips", (req, res) => {
  let { body: reqBody } = req;
  let {
    equipIndex,
    equipName,
    equipNumber,
    codeIndex,
  } = reqBody;


  let data = {
    created_date: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
    equip_index: equipIndex,
    equip_nm: equipName || null,
    equip_num: equipNumber || null,
    code_index: codeIndex || null,
  };

  let _query = queryConfig.insert(INFO_EQUIPMENT);
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


// 장비 정보 삭제(DELETE)
router.delete("/equips/:id", (req, res) => {
  let { id } = req.params;

  let _query = queryConfig.delete(INFO_EQUIPMENT, 'id');

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

/** 장비 관리 이력 (table: rec_equip_view) */

// 장비 관리이력 조회(GET-SELECT)
router.get("/logs", (req, res) => {
  let _query = queryConfig.findByAll(REC_EQUIPMENT_VIEW);

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
  // let _query = queryConfig.findByLogId();
  let _query = queryConfig.findById(REC_EQUIPMENT_VIEW, 'equip_seq');
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

// 장비 관리이력 추가(INSERT)
router.post("/logs", (req, res) => {
  let { body: reqBody } = req;
  let { writer, equipIndex, manager, safetyChk, description } = reqBody;

  let data = {
    created_date: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
    writer: writer || null,
    equip_index: equipIndex || null,
    manager: manager || null,
    safety_chk: safetyChk || null,
    description: description || null,
  };
  
  let _query = queryConfig.insert(LOG_EQUIPMENT);
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
