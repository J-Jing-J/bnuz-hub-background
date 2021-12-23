const connection = require('../app/database');

// 操作数据库
class UserService {
  // 创建用户
  async create(user) {
    // 将user存到数据库中
    const { name, password } = user
    const statement = `INSERT INTO users(name, password) VALUES (?, ?);`
    // 导出connection的时候加了promise
    console.log(name, 111);
    const result = await connection.execute(statement, [name, password]);
    console.log("将用户数据保存到数据库中", user);
    return result;
  }

  async getUserByName(name) {
    const statement = `SELECT * FROM users WHERE name = ?;`;
    const result = await connection.execute(statement, [name]);
    // 查询出来的结果是一个数组
    return result[0];
  }
}

module.exports = new UserService();