const jwt = require('jsonwebtoken')

const errorTypes = require('../constants/error-types');
const userservice = require('../service/user.service');
const AuthService = require('../service/auth.service');
const md5password = require('../utils/password-handle');
const { PUBLIC_KEY } = require('../app/config')

const verifyLogin = async (ctx, next) => {
  // 获取用户名密码
  const { name, password } = ctx.request.body;

  // 判断是否为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    // 第一个参数是错误类型
    return ctx.app.emit('error', error, ctx);
  }

  // 判断是否已存在
  // 查询出来的结果是一个数组
  const result = await userservice.getUserByName(name);
  const user = result[0]
  // 用户若不存在
  if (!user) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }

  // 判断密码是否一致（加密）
  if (md5password(password) !== user.password) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRENT);
    return ctx.app.emit('error', error, ctx);
  }


  ctx.user = user;

  await next();

}

const verifyAuth = async (ctx, next) => {
  console.log("验证授权的middleware");
  // 获取token
  const authorization = ctx.headers.authorization;
  // 若不判断，token是undefined
  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit('error', error, ctx)
  }
  const token = authorization.replace('Bearer ', '');

  // 验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    });
    ctx.user = result;
    await next();
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION)
    ctx.app.emit('error', error, ctx)
  }
}

// 验证要修改的动态是否是改用户发表的
const verifyPermission = async (ctx, next) => {
  console.log("验证修改权限的middleware");
  // params: { commentId: '1' }
  // 取出？拼接的键名“表名+Id”
  const [resourceKey] = Object.keys(ctx.params);
  // 将Id替换为空字符串，拿到表名
  const tableName = resourceKey.replace('Id', '');
  // 通过params的键拿到value（id）
  const resourceId = ctx.params[resourceKey];
  const { id } = ctx.user;

  // 查询是否具备权限，联合如果能查出结果就具备权限
  try {
    const isPermission = await AuthService.checkResource(tableName, resourceId, id);
    if (!isPermission) throw new Error();
    // koa中的异步
    await next()
  } catch (e) {
    const error = new Error(errorTypes.UNPERMISSION)
    return ctx.app.emit('error', error, ctx)
  }
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}