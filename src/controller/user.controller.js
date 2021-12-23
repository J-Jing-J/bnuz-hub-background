const service = require('../service/user.service')

// router请求的方法
// 其中查询数据库的操作抽取到service中
class userController {
  async create(ctx, next) {
    // 获取用户请求传递的参数
    // json格式的对象，通过koa-bodyParser解析了
    const user = ctx.request.body;

    // 查询数据
    const result = await service.create(user);

    // 返回数据
    ctx.body = result;
  }
}

module.exports = new userController()