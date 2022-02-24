const connection = require('../app/database')

class labelService {
  async create(name) {
    try {
      const statement = `INSERT INTO label (name) VALUES (?)`
      const [result] = await connection.execute(statement, [name]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getLabelByName(name) {
    try {
      const statement = `SELECT * FROM label WHERE name = ?;`;
      const [result] = await connection.execute(statement, [name]);
      return result[0]
    } catch (error) {
      console.log(error);
    }
  }

  async getLabels(limit, offset) {
    try {
      const statement = `SELECT * FROM label LIMIT ? , ?;`;
      const [result] = await connection.execute(statement, [offset, limit]);
      return result
    } catch (error) {
      console.log(error);
    }
  }
}


module.exports = new labelService()