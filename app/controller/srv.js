'use strict';

/**
 * 服务器列表
 */

const BaseController = require('./base');

class SrvController extends BaseController {

  constructor(props) {
    super(props);
    this.srvService = this.ctx.service.srv;
  }

  async list() {
    const result = await this.srvService.list();
    console.log(result);
    this.ctx.body = this.success(result);
  }
}

module.exports = SrvController;
