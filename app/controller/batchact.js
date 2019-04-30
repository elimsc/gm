'use strict';

/**
 * 批量操作
 */

const BaseController = require('./base');

class BatchActController extends BaseController {
  constructor(props) {
    super(props);
    this.logger.info(this.ctx.request.body);
  }

  // 批量操作
  async act() {
    this.ctx.body = this.success();
  }


}

module.exports = BatchActController;
