'use strict';

const BaseController = require('./base');

class BroadcastController extends BaseController {
  /**
   * POST /broadcast/tpl/add
   * 添加广播模板
   */
  async addTpl() {
    const anntplService = this.ctx.service.anntpl;
    const res = await anntplService.create(this.ctx.request.body);
    if (res) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.failed();
    }
  }

  /**
   * DELETE /broadcast/tpl/:id
   * 删除指定id的广播模板
   */
  async deleteTpl() {
    const anntplService = this.ctx.service.anntpl;
    const tplId = this.ctx.params.id;
    const result = await anntplService.delete(tplId);
    if (result) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.failed();
    }
  }

  /**
   * GET /broadcast/tpl/list
   * 显示当前所有的广播模板
   */
  async listTpl() {
    const anntplService = this.ctx.service.anntpl;
    const tpls = await anntplService.list();
    this.ctx.body = this.success(tpls);
  }
}

module.exports = BroadcastController;
