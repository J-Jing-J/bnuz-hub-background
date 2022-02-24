const errorType = require('../constants/error-types');
const service = require('../service/user.service');
const md5password = require('../utils/password-handle')


const verifyUser = async (ctx, next) => {
  // 拿到用户名和密码
  const { name, password } = ctx.request.body;
  // 判断不能为空
  if (!name || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    // 第一个参数是错误类型
    return ctx.app.emit('error', error, ctx);
  }
  // 判断是否已存在
  const result = await service.getUserByName(name);
  // 查询出来的结果是一个数组
  if (result.length) {
    const error = new Error(errorType.USER_DOES_NOT_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }
  // 符合条件再执行下一个中间件（再创建用户）
  await next();
}


const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5password(password);
  await next();
}




module.exports = { verifyUser, handlePassword }