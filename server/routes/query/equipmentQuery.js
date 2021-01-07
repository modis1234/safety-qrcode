const queryConfig = {
    findByAll() {
      let query = `SELECT * FROM info_equipment;`;
      return query;
    },
    findById() {
      let query = `SELECT * FROM info_equipment WHERE id=?;`;
      return query;
    },
    insertOfInfo() {
      let query = `INSERT INTO info_equipment SET ?;`;
      return query;
    },
    updateOfInfo() {
      let query = `UPDATE info_equipment SET ? WHERE id=?;`;
      return query;
    },
    deleteOfInfo() {
      let query = `DELETE FROM info_equipment WHERE id=?;`;
      return query;
    },
    findByLog() {
      let query = `SELECT * FROM rec_equipment_view;`;
      return query;
    },
    findByLogId() {
      let query = `SELECT * FROM rec_equipment_view WHERE equip_seq=?;`;
      return query;
    },
    insertOfLog() {
      let query = `INSERT INTO rec_equipment_view SET ?;`;
      return query;
    },
  };
  
  module.exports = queryConfig;
  