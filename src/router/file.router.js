const Router = require('koa-router');

const {
  verifyAuth
} = require('../middleware/auth.middleware')
const {
  avatarHandler,
  pictureHandler,
  pictureResize
} = require('../middleware/file.middleware')
const {
  saveAvatarInfo,
  savaPictureInfo
} = require('../controller/file.controller')

const fileRouter = new Router({ prefix: '/upload' });

// 上传头像
// 服务器上会有一个upload/avatar，upload/picture文件夹
fileRouter.post('/avatar', verifyAuth, avatarHandler, saveAvatarInfo);
fileRouter.post('/picture', verifyAuth, pictureHandler, pictureResize, savaPictureInfo);


module.exports = fileRouter;