'use strict';

/**
 * 玩家操作 -- 清除数据
 */

const BaseController = require('../base');

class ClearController extends BaseController {
  constructor(props) {
    super(props);
    this.clearService = this.ctx.service.clear;
    this.sysactService = this.ctx.service.sysact;
  }

  /**
   * POST /player/clear/secure-code
   * 清除安全码
   */
  async clearSecureCode() {
    const { guid, part_id } = this.ctx.request.body;
    const r = await this.sysactService.gmIns({ cmd: 'sys', content: 'cl_lock', guid, part_id });
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }

  /**
   * POST /player/clear/un-gang
   * 清除非正常帮会数据
   */
  async clearUnGang() {
    const r = await this.clearService.clearUnGang(this.ctx.request.body);
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }

  /**
   * POST /player/clear/un-task
   * 清除非正常任务
   */
  async clearUnTask() {
    const { guid, part_id, task_id } = this.ctx.request.body;
    const content = `d=${task_id}`;
    const r = await this.sysactService.gmIns({ cmd: 'ms', content, guid, part_id });
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }
}

module.exports = ClearController;
