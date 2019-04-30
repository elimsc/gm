'use strict';

/**
 * 系统操作
 */

const BaseController = require('./base');

class SysActControler extends BaseController {
  constructor(props) {
    super(props);
    this.logger.info(this.ctx.request.body);
  }

  // 服务与活动管理
  async activity() {
    this.ctx.body = this.success();
  }

  // GM指令
  async gmins() {
    this.ctx.body = this.success();
  }

  // 服务器强制下线
  async srvForceDown() {
    this.ctx.body = this.success();
  }
}

module.exports = SysActControler;
