const queryConfig = {
  findByAll(table) {
    let query = `SELECT * FROM ${table}`;
    return query;
  },
  findById(table, field = "id") {
    let query = `SELECT * FROM ${table} WHERE ${field}=?;`;
    return query;
  },
  insert(table) {
    let query = `INSERT INTO ${table} SET ?;`;
    return query;
  },
  update(table, field = "id") {
    let query = `UPDATE ${table} SET ? WHERE ${field}=?;`;
    return query;
  },
  delete(table, field = "id") {
    let query = `DELETE FROM ${table} WHERE ${field}=?;`;
    return query;
  },
  authLogin() {
    let query = `SELECT id, COUNT(*) AS count, login_date, logout_date FROM tb_account WHERE phone_num=?;`;
    return query;
  },
  authLogout() {
    let query = `UPDATE tb_account SET ? WHERE phone_num=?;`;
    return query;
  },
};

module.exports = queryConfig;
