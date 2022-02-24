// dotenv库可以加载根目录下的.env文件到process.env
const { privateDecrypt } = require('crypto');
const dotenv = require('dotenv');
const fs = require('fs')
const path = require('path')

dotenv.config();

// console.log(process.env);

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './key/private.key'));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './key/public.key'));


module.exports = {
  APP_PORT,
  APP_HOST,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env

// 这两个要写在后面，因为前面给module.exports重新赋值了
module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;