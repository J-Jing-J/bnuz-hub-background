const fs = require('fs')

// 把router使用起来
// app.use(userRouter.routes());
// // 请求方法没有时，返回不允许
// app.use(userRouter.allowedMethods());
// app.use(authRouter.routes());
// app.use(authRouter.allowedMethods());

// 把所有路由都use一下
const useRoutes = function () {
  // 读取当前目录下的所有router文件，并遍历
  fs.readdirSync(__dirname).forEach(file => {
    // 忽略当前文件
    if (file === 'index.js') return;
    const router = require(`./${file}`)
    this.use(router.routes())
    this.use(router.allowedMethods())
  })
}

module.exports = useRoutes;