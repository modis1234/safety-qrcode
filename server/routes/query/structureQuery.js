const queryConfig = {
  findByAll() {
    let query = `SELECT * FROM comm_structure;`;
    return query;
  },
  findById() {
    let query = `SELECT * FROM comm_structure WHERE id=?;`;
    return query;
  },
  insertOfInfo() {
    let query = `INSERT INTO info_structure SET ?;`;
    return query;
  },
  updateOfInfo() {
    let query = `UPDATE info_structure SET ? WHERE id=?;`;
    return query;
  },
  deleteOfInfo() {
    let query = `DELETE FROM info_structure WHERE id=?;`;
    return query;
  },
  findByLog() {
    let query = `SELECT * FROM rec_structure_view;`;
    return query;
  },
  findByLogId() {
    let query = `SELECT * FROM rec_structure_view WHERE structure_seq=?;`;
    return query;
  },
  insertOfLog() {
    let query = `INSERT INTO log_structure SET ?;`;
    return query;
  },
};

module.exports = queryConfig;
