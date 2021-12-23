const crypto = require('crypto')


const md5password = (password) => {
  const md5 = crypto.createHash('md5');
  md5.update(password).digest('hex');
}