const service = require('../service/label.service')


const verifyLableExists = async (ctx, next) => {
  try {
    const { labels } = ctx.request.body;
    const newLabels = [];
    for (let name of labels) {
      const label = { name };
      // 返回查询的[0]数据
      const labelResult = await service.getLabelByName(name);
      if (!labelResult) {
        // 如果不存在该标签，就创建标签数据
        const result = await service.create(name);
        label.id = result.insertId
      } else {
        label.id = labelResult.id;
      }
      newLabels.push(label)
    }
    ctx.labels = newLabels;
    await next();
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  verifyLableExists
}