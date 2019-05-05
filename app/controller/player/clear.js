'use strict';

/**
 * 玩家操作 -- 清除数据
 */

const BaseController = require('../base');

class ClearController extends BaseController {
  constructor(props) {
    super(props);
    this.clearService = this.ctx.service.clear;
  }

  /**
   * POST /player/clear/secure-code
   * 清除安全码
   */
  async clearSecureCode() {
    await this.clearService.clearSecureCode(this.ctx.request.body);
    this.ctx.body = this.success();
  }

  /**
   * POST /player/clear/un-gang
   * 清除非正常帮会数据
   */
  async clearUnGang() {
    await this.clearService.clearUnGang(this.ctx.request.body);
    this.ctx.body = this.success();
  }

  /**
   * POST /player/clear/un-task
   * 清除非正常任务
   */
  async clearUnTask() {
    await this.clearService.clearUnTask(this.ctx.request.body);
    this.ctx.body = this.success();
  }
}

module.exports = ClearController;
