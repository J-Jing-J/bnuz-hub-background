const fs = require('fs');

const usersService = require('../service/user.service')
const fileService = require('../service/file.service')
const { AVATAR_PATH } = require('../constants/file-path')


// router请求的方法
// 其中查询数据库的操作抽取到service中
class userController {
  async create(ctx, next) {
    // 获取用户请求传递的参数
    // json格式的对象，通过koa-bodyParser解析了
    const user = ctx.request.body;

    // 查询数据
    const result = await usersService.create(user);

    // 返回数据
    ctx.body = result;
  }

  async avatarInfo(ctx, next) {
    try {
      // 用户的头像是哪一个文件？
      const { userId } = ctx.params;
      const avatarInfo = await fileService.getAvatarByUserId(userId);
      // 提供图像信息
      console.log(`${AVATAR_PATH}/${avatarInfo.filename}`);
      // 默认会自动下载文件
      // 这样设置一下response的mime-type就会显示图片不下载
      ctx.response.set('content-type', avatarInfo.mietype);
      ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new userController()