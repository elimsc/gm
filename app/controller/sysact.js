'use strict';

/**
 * 系统操作
 */

const BaseController = require('./base');

class SysActControler extends BaseController {

  constructor(props) {
    super(props);
    this.sysactService = this.ctx.service.sysact;
  }

  // 服务与活动列表
  async activityList() {
    const r = await this.sysactService.fetchActivity();
    this.ctx.body = this.success(r);
  }

  // 更新服务与活动信息
  async updateActivity() {
    const r = await this.sysactService.updateActivity();
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }

  // GM指令
  // POST /sysact/gmins
  async gmins() {
    const r = await this.sysactService.gmIns(this.ctx.request.body);
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }

  // 服务器强制下线
  async srvForceDown() {
    const r = await this.sysactService.forcedown();
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }
}

module.exports = SysActControler;
