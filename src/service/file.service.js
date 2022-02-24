const connection = require('../app/database')

class FileService {
  async createAvatar(filename, mimetype, size, userId) {
    try {
      const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?)`;
      const [result] = await connection.execute(statement, [filename, mimetype, size, userId]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getAvatarByUserId(userId) {
    try {
      const statement = `SELECT * FROM avatar WHERE user_id = ?;`;
      const [result] = await connection.execute(statement, [userId]);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }

  async createFile(filename, mimetype, size, userId, momentId) {
    try {
      const statement = `INSERT INTO file (filename, mimetype, size, user_id, moment_id) VALUES (?, ?, ?, ?, ?)`;
      const [result] = await connection.execute(statement, [filename, mimetype, size, userId, momentId]);
      return result;
    } catch (error) {
      console.log(error);
    }

  }

  async getFileInfo(filename) {
    try {
      const statement = `SELECT * FROM file WHERE filename = ?;`;
      const [result] = await connection.execute(statement, [filename]);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new FileService();