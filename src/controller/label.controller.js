const service = require('../service/label.service')

class LabelController {
  async create(ctx, next) {
    try {
      const { name } = ctx.request.body;
      const result = await service.create(name);
      ctx.body = result;
    } catch (error) {
      console.log(error);
    }
  }

  async list(ctx, next) {
    try {
      const { limit, offset } = ctx.query;
      const result = await service.getLabels(limit, offset);
      ctx.body = result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new LabelController();