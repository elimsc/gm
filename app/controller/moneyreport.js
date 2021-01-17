'use strict';

/**
 * 帮会操作
 */

const BaseController = require('./base');

class MoneyreportController extends BaseController {
  constructor(props) {
    super(props);
    this.moneyreportService = this.ctx.service.moneyreport;
  }

  /**
   * POST moneyreport/report
   * 充值上报控制
   */
  async report() {
    const r = await this.moneyreportService.report(this.ctx.request.body);
    this.ctx.body = this.success(r);
  }


}

module.exports = MoneyreportController;
