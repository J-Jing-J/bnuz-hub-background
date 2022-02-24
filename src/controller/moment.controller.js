const fs = require('fs')

const fileService = require('../service/file.service');
const momentService = require('../service/moment.service');
const { PICTURE_PATH } = require('../constants/file-path');
const { pictureHandler } = require('../middleware/file.middleware');

class MomentController {
  async create(ctx, next) {
    // 获取数据
    const userId = ctx.user.id;
    const content = ctx.request.body.content;

    const result = await momentService.create(userId, content)

    ctx.body = result;
  }

  async detail(ctx, next) {
    // 拿到moment的id
    // momentId是根据接口路径'/:momentId'来获取的
    // params是 / 1
    // query是?1
    const momentId = ctx.params.momentId;
    const result = await momentService.getMomentById(momentId)

    ctx.body = result;


  }

  // 查询list所有动态要分页
  // offset第几页
  // size一页多少条数据
  async list(ctx, next) {
    const { offset, size } = ctx.query;

    const result = await momentService.getMomentList(offset, size);

    ctx.body = result;
  }

  async update(ctx, next) {
    const { momentId } = ctx.params
    const { content } = ctx.request.body;
    const result = await momentService.update(content, momentId);
    ctx.body = result;
  }

  async remove(ctx, next) {
    const { momentId } = ctx.params
    const result = await momentService.remove(momentId);
    ctx.body = result;
  }

  async addLabels(ctx, next) {
    // 获取标签和动态Id
    // 在verifyLableExists中间价中把labels放入了ctx
    const { labels } = ctx;
    const { momentId } = ctx.params;

    for (const label of labels) {
      // 判断label是否已经和这个动态有过关系了
      const isExist = await momentService.hasLabel(momentId, label.id);
      if (!isExist) {
        await momentService.addLabel(momentId, label.id);
      }
    }
    ctx.body = "给动态添加标签成功"

  }

  async fileInfo(ctx, next) {
    const { filename } = ctx.params;
    const fileInfo = await fileService.getFileInfo(filename);
    const type = ctx.query;
    const types = ["small", "middle", "large"];
    if (types.some(item => item === type)) {
      filename = filename + '-' + type;
    }
    ctx.response.set('content-type', fileInfo.mimetype);
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
  }
}

module.exports = new MomentController();