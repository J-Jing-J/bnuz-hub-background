const crypto = require('crypto')


const md5password = (password) => {
  try {
    const md5 = crypto.createHash('md5');
    const result = md5.update(password + '').digest('hex'); //将拿到的二进制buffer数据转成16进制的字符串
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = md5password