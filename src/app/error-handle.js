const errorTypes = require('../constants/error-types');


const errorHandle = (error, ctx) => {
  let status, message;
  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400 //bad request
      message = "用户名或密码不能为空";
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      status = 409 //conflict冲突
      message = "用户已存在";
      break;
    case errorTypes.USER_DOES_NOT_EXISTS:
      status = 400 //参数错误bad request
      message = "用户名不存在";
      break;
    case errorTypes.PASSWORD_IS_INCORRENT:
      status = 400 //参数错误bad request
      message = "密码错误";
      break;
    case errorTypes.UNAUTHORIZATION:
      status = 401 //参数错误bad request
      message = "未授权，无效token";
      break;
    case errorTypes.UNPERMISSION:
      status = 401 //参数错误bad request
      message = "您不具备操作权限";
      break;
    default:
      status = 404;
      message = "默认错误"
  }
  ctx.status = status;
  ctx.body = message;
}

module.exports = errorHandle;