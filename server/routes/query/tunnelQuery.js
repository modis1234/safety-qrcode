const queryConfig = {
  findByAll() {
    let query = `SELECT * FROM comm_tunnel;`;
    return query;
  },
  findById() {
    let query = `SELECT * FROM comm_tunnel WHERE id=?;`;
    return query;
  },
  insertOfInfo() {
    let query = `INSERT INTO info_tunnel SET ?;`;
    return query;
  },
  updateOfInfo() {
    let query = `UPDATE info_tunnel SET ? WHERE id=?;`;
    return query;
  },
  deleteOfInfo() {
    let query = `DELETE FROM info_tunnel WHERE id=?;`;
    return query;
  },
  findByLog() {
    let query = `SELECT * FROM rec_tunnel_view;`;
    return query;
  },
  findByLogId() {
    let query = `SELECT * FROM rec_tunnel_view WHERE tunnel_seq=?;`;
    return query;
  },
  insertOfLog() {
    let query = `INSERT INTO log_tunnel SET ?;`;
    return query;
  },
};

module.exports = queryConfig;
