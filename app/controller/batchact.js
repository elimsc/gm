'use strict';

/**
 * 批量操作
 */

const BaseController = require('./base');

class BatchActController extends BaseController {

  // 批量操作
  async act() {
    this.ctx.body = this.success();
  }


}

module.exports = BatchActController;
