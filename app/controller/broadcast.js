'use strict';

/**
 * 系统广播
 */

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

  /**
   * POST broadcast/add
   * 服务器广播
   */
  async addBroadcast() {
    const service = this.ctx.service.broadcast;
    const { content, duration, frequency, part_id } = this.ctx.request.body;
    const r = await service.broadcast({ msg: content, interval: parseInt(frequency), time: parseInt(duration), part_id });
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }
}

module.exports = BroadcastController;
