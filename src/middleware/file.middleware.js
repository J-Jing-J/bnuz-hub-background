const path = require('path')

const Jimp = require('jimp');
// 用koa-multer插件上传头像
const Multer = require('koa-multer');
const { AVATAR_PATH, PICTURE_PATH } = require('../constants/file-path')

const avatarUpload = Multer({
  dest: AVATAR_PATH
})

const avatarHandler = avatarUpload.single('avatar');


const pictureUpload = Multer({
  dest: PICTURE_PATH
})

// 设置最多上传9张图片
const pictureHandler = pictureUpload.array('picture', 9);


// 对图片尺寸进行处理
// sharp库或者jimp库
// jimp库小一点
const pictureResize = async (ctx, next) => {
  try {
    // 获取所有图像信息
    const files = ctx.req.files;
    for (const file of files) {
      const destPath = path.join(file.destination, file.filename);
      // read会返回promise
      // 为了不阻塞，要用then而不是await
      Jimp.read(file.path).then(image => {
        // Jimp.AUTO根据宽度自动调节高度
        image.resize(1280, Jimp.AUTO).write(`${destPath}-large`);
        image.resize(640, Jimp.AUTO).write(`${destPath}-middle`);
        image.resize(320, Jimp.AUTO).write(`${destPath}-small`);
      })
    }
    await next();
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  avatarHandler,
  pictureHandler,
  pictureResize
}