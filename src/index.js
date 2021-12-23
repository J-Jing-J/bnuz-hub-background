const app = require('./app');
// （对app的操作）如中间件加在这里太多了
// 抽到了app文件夹中
// 入口越简单越好

// 加载链接数据库的文件
require('./app/database');

const config = require('./app/config')


// 对于会改变的,如数据库密码,端口号,,抽离到.env文件
// dotenv库可以加载根目录下的.env文件到process.env
app.listen(config.APP_PORT, () => {
  console.log(`服务器在${config.APP_PORT}端口启动成功`);
})