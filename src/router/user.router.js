const Router = require('koa-router');
const {
  create,
} = require('../controller/user.controller')
const {
  verifyUser,
  handlePassword
} = require('../middleware/user.middleware')


const userRouter = new Router({ prefix: '/users' })

// post restful接口
userRouter.post('/', verifyUser, create)

// userRouter.post('/', verifyUser, handlePassword, create)
// userRouter.post('/', create)

module.exports = userRouter