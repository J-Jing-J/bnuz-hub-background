const Router = require('koa-router');

const momentRouter = new Router({ prefix: '/moment' })

const {
  create,
  detail,
  list,
  update,
  remove,
  addLabels,
  fileInfo
} = require('../controller/moment.controller')

const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware')

const {
  verifyLableExists
} = require('../middleware/label.middleware');

// 发表心情
momentRouter.post('/', verifyAuth, create)
// 获取多条数据
momentRouter.get('/', list);
// 获取某条动态
momentRouter.get('/:momentId', detail)

// 修改动态
// 验证用户是否登录
// 验证这条数据是否是该用户发表的动态
// 修改动态
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update)
// 删除动态
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove)
// 给动态添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLableExists, addLabels)
// 动态配图
momentRouter.get('/images/:filename', fileInfo)
module.exports = momentRouter;