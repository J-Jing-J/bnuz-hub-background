// dotenv库可以加载根目录下的.env文件到process.env
const dotenv = require('dotenv');

dotenv.config();

// console.log(process.env);


module.exports = {
  APP_PORT,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env