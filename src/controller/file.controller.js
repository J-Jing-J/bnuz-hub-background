const fileService = require('../service/file.service');
const userService = require('../service/user.service');
const { AVATAR_PATH } = require('../constants/file-path');
const { APP_HOST, APP_PORT } = require('../app/config')

class fileController {
  async saveAvatarInfo(ctx, next) {
    try {
      const { id } = ctx.user;
      // 获取头像相关的信息
      const { filename, mimetype, size } = ctx.req.file;
      // 将图像的信息数据保存到数据库中
      const result = await fileService.createAvatar(filename, mimetype, size, id)

      // 将图片地址保存到user表中
      const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
      userService.updateAvatarUrlById(avatarUrl, id)

      ctx.body = {
        statusCode: 1110,
        message: "上传头像成功",
        data: result
      }
    } catch (error) {
      console.log(error);
    }
  }

  async savaPictureInfo(ctx, next) {
    try {
      const { id } = ctx.user;
      const { momentId } = ctx.query;
      // 获取图像信息
      const files = ctx.req.files;
      // 将图片数据保存到数据库中
      for (const file of files) {
        const { filename, mimetype, size } = file;
        await fileService.createFile(filename, mimetype, size, id, momentId);
      }
      ctx.body = "图片上传成功"
    } catch (error) {
      console.log(error);
    }
  }


}

module.exports = new fileController()