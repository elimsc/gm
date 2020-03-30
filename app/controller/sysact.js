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

  // 查询现在支付黑白名单
  // POST /sysact/listpayblacklist
  async listPayBlacklist() {
    const { part_id, mode } = this.ctx.request.body;
    const r = await this.sysactService.listPayBlacklist({ part_id, mode });

    const isPhone = v => /^\d{11}$/.test(v);
    const isUID = v => /^\d+$/.test(v);
    const typeMap = v => {
      if (isPhone(v)) return '手机号';
      if (isUID(v)) return 'UID';
      return "IMEI";
    }

    const data = r.map((v, i) => { return { value: v, type: typeMap(v), key: i } });
    this.ctx.body = this.success(data);
  }

  // 增删现在支付黑白名单
  // POST /sysact/updatepayblacklist
  async updatePayBlacklist() {
    const { part_id, mode, add_list, del_list } = this.ctx.request.body;
    const r = await this.sysactService.updatePayBlacklist({ part_id, mode, add_list, del_list });
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }

}

module.exports = SysActControler;
