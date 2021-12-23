const Koa = require('koa');
// 解析用户传来的json数据
const bodyParser = require('koa-bodyparser')
const userRouter = require('../router/user.router')
const errorHandle = require('./error-handle')

const app = new Koa();



// 要放在上面，因为中间件挨个执行
app.use(bodyParser());
// 把router使用起来
app.use(userRouter.routes());

// 请求方法没有时，返回不允许
app.use(userRouter.allowedMethods());

app.on('error', errorHandle),


  // 将app和对app的操作抽离出来，简化入口文件
  module.exports = app;