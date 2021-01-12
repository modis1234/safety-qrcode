const express = require("express");
const router = express.Router();
const pool = require("./config/connectionPool");

const queryConfig = require("./query/configQuery");

const moment = require("moment");
const { authLogin } = require("./query/configQuery");
const { response } = require("express");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

const TB_ACCOUNT = "tb_account";

// 계정 조회
router.get("/accounts", (req, res) => {
  let _query = queryConfig.findByAll(TB_ACCOUNT);
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
  });
});

// 계정 등록
router.post("/accounts", (req, res) => {
  let _query = queryConfig.insert(TB_ACCOUNT);
  // let { body: reqBody } = req;
  let {
    name,
    position,
    firstPhoneNum,
    phoneNum,
    commRole,
    bridgeRole,
    tunnelRole,
    structureRole,
    equipRole,
    workerRole,
  } = req.body;

  let data = {
    created_date: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
    name,
    position,
    first_phone_num: firstPhoneNum,
    phone_num: phoneNum,
    comm_role: commRole,
    bridge_role: bridgeRole,
    tunnel_role: tunnelRole,
    structure_role: structureRole,
    equip_role: equipRole,
    worker_role: workerRole,
  };

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
  });
});
// 계정 수정
router.put("/accounts/:id", (req, res) => {
  let { id } = req.params;
  let {
    name,
    position,
    firstPhoneNum,
    phoneNum,
    commRole,
    bridgeRole,
    tunnelRole,
    structureRole,
    equipRole,
    workerRole,
  } = req.body;

  let data = {
    modified_date: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
    name,
    position,
    first_phone_num: firstPhoneNum,
    phone_num: phoneNum,
    comm_role: commRole,
    bridge_role: bridgeRole,
    tunnel_role: tunnelRole,
    structure_role: structureRole,
    equip_role: equipRole,
    worker_role: workerRole,
  };

  let updateData = [];
  updateData[0] = data;
  updateData[1] = id;

  let _query = queryConfig.update(TB_ACCOUNT, "id");
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
// 계정 삭제
router.delete("/accounts/:id", (req, res) => {
  let { id } = req.params;
  let _query = queryConfig.delete(TB_ACCOUNT, "id");
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

// 로그인
router.post('/accounts/login', (req, res)=>{
  let {
   phoneNum
  } = req.body;
  console.log(req.body)
  let _query = authLogin();
  console.log(_query)
  let data=[];
  data[0] = phoneNum
  pool.getConnection((err, connection) => {
   if (err) {
     res.status(err.status).end();
     throw new Error("Response Error!!");
   } else {
     connection.query(_query, phoneNum, (err, results, field) => {
       if (err) {
         res.status(404).end();
         throw err;
       } else {
         let { id:userId, count } = results[0];
       
         if(count > 0 && userId){
           // 로그인 성공
           let successLogin = {
             ...results[0],
             is_logined: true,
             login_date: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
             logout_date: null,
             message: '로그인 성공'
           }
           req.session[phoneNum] = successLogin;
           req.session.save(()=>{
             res.send(successLogin);
           });
           console.log(req.session)
         } else {
           // 로그인 실패
           let errorLogin = {
             ...results[0],
             is_logined: false,
             message: '로그인 실패'
           }
           res.json(errorLogin)
         }
       }
     });
   }
 });
});

// 로그아웃
router.post('/accounts/logout', (req, res) => {
  let { id } = req.body;

  console.log(id)
  let date ={
    logout_date: moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
    login_date: null
  };
  let updateData = [];
  updateData[0] = date;
  updateData[1] = id; 
  let _query = queryConfig.authLogout();

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
          req.session.destroy(() => {
            res.json('logout_success');
       });
          console.log(req.session) 
        }
      });
    }
    connection.release();
  });

  
});

module.exports = router;
