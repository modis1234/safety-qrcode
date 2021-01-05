const queryConfig = {
  findByAll() {
    let query = `SELECT * FROM comm_bridge;`;
    return query;
  },
  findById() {
    let query = `SELECT * FROM comm_bridge WHERE id=?;`;
    return query;
  },
  insertOfInfo() {
    let query = `INSERT INTO info_bridge SET ?;`;
    return query;
  },
  updateOfInfo() {
    let query = `UPDATE info_bridge SET ? WHERE id=?;`;
    return query;
  },
  deleteOfInfo() {
    let query = `DELETE FROM info_bridge WHERE id=?;`;
    return query;
  },
  findByLog() {
    let query = `SELECT * FROM bridge_view;`;
    return query;
  },
  findByLogId() {
    let query = `SELECT * FROM bridge_view WHERE bridge_seq=?;`;
    return query;
  },
  insertOfLog() {
    let query = `INSERT INTO log_bridge SET ?;`;
    return query;
  },
};

module.exports = queryConfig;
