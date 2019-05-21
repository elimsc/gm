'use strict';

/**
 * 系统相关数据
 */
const BaseController = require('./base');

class SysdataController extends BaseController {
  constructor(props) {
    super(props);
    this.sysdataService = this.ctx.service.sysdata;
  }

  /**
   * POST sysdata/prop
   */
  async prop() {
    const { name } = this.ctx.request.body;
    const r = await this.sysdataService.listPropByName(name);
    this.ctx.body = this.success(r);
  }
}

module.exports = SysdataController;
