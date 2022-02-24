const connection = require('../app/database');

// 抽出SQL语句的公共部分
const sqlFragment = `
  SELECT
    m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
    JSON_OBJECT('id', u.id, 'name', u.name) author
  FROM moment m
  LEFT JOIN user u ON m.user_id = u.id 
`

class MomentService {
  async create(userId, content) {
    try {
      const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`;
      const [result] = await connection.execute(statement, [content, userId]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  // 查找单条动态
  async getMomentById(momentId) {
    try {
      const statement = `
        SELECT 
          m.id id, m.content content, m.updateAt updateTime,
          JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) user,
          IF( 
              COUNT(l.id),
              JSON_ARRAYAGG(
                JSON_OBJECT('id', l.id, 'name', l.name)
              ),
              NULL) labels,
          (SELECT IF(COUNT(c.id),
            JSON_ARRAYAGG(
              JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.createAt,
               'user', JSON_OBJECT('id', cu.id, 'name', cu.name, 'avatarUrl', cu.avatar_url))
              ), 
            NULL) 
            FROM comment c LEFT JOIN user cu ON c.user_id = cu.id WHERE m.id = c.moment_id
          ) comments,
          (SELECT JSON_ARRAYAGG(CONCAT('http://lacalhost:8000/moment/images',file.filename)) 
          FROM file WHERE m.id = file.moment_id) images
        FROM moment m
        LEFT JOIN user u ON m.user_id = u.id
        LEFT JOIN comment c ON c.moment_id = m.id
        LEFT JOIN user cu ON c.user_id = cu.id
         
        LEFT JOIN moment_label ml ON m.id = ml.moment_id
        LEFT JOIN label l ON ml.label_id = l.id
        WHERE m.id = 4
        GROUP BY m.id;
        `
      const [result] = await connection.execute(statement, [momentId]);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }

  // 查找多条动态
  async getMomentList(offset, size) {
    // LIMIT offset, size
    try {
      const statement = `
      SELECT 
        m.id id, m.content content, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name) user,
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
        (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
      FROM moment m
      LEFT JOIN user u ON m.user_id = u.id 
      LIMIT ?, ?
      `;
      const [result] = await connection.execute(statement, [offset, size])
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async update(content, momentId) {
    try {
      const statement = `UPDATE moment SET content = ? WHERE id = ?;`;
      const [result] = await connection.execute(statement, [content, momentId]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async remove(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?`;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }


  async hasLabel(momentId, labelId) {
    try {
      const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`;
      const [result] = await connection.execute(statement, [momentId, labelId]);
      return result[0] ? true : false;
    } catch (error) {
      console.log(error);
    }
  }

  async addLabel(momentId, labelId) {
    try {
      const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (? ,?);`;
      const [result] = await connection.execute(statement, [momentId, labelId]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new MomentService()