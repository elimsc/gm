'use strict';

/**
 * 帮会操作
 */

const BaseController = require('./base');

class GangController extends BaseController {
  constructor(props) {
    super(props);
    this.gangService = this.ctx.service.gang;
    this.sysactService = this.ctx.service.sysact;
    this.banService = this.ctx.service.ban;
  }

  /**
   * POST gang/list
   * 帮会列表
   */
  async list() {
    const { part_id } = this.ctx.request.body;
    const r = await this.gangService.list({ part_id });
    this.ctx.body = this.success(r);
  }

  /**
   * POST gang/info
   * 帮会信息
   */
  async info() {
    const { gang_guid, part_id } = this.ctx.request.body;
    const r = await this.gangService.info({ gang_guid, part_id });
    this.ctx.body = this.success(r);
  }

  /**
   * POST gang/ban
   * 封号
   */
  async ban() {
    const { uid, part_id, guid } = this.ctx.request.body;
    const r = await this.banService.banAccount({ type: -1, flag: 0, time: 0, reason: 'GM帮会操作封号', uid: `${uid}`, part_id, guid });
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }

  /**
   * POST gang/notice
   * 修改公告
   */
  async notice() {
    const { gang_guid, part_id, notice } = this.ctx.request.body;
    const r = await this.sysactService.gmIns({ cmd: 'gang', guid: '0', content: `changenotice=${gang_guid}=${notice}`, part_id });
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }

  /**
   * POST gang/dismiss
   * 解散帮会
   */
  async dismiss() {
    const { gang_guid, part_id } = this.ctx.request.body;
    const r = await this.sysactService.gmIns({ cmd: 'gang', guid: '0', content: `dismiss=${gang_guid}`, part_id });
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }

  /**
   * POST gang/gmins
   * 帮会GM指令
   */
  async gmIns() {
    const { gang_guid, part_id, gang_cmd, params } = this.ctx.request.body;
    let r;
    if (!params) {
      r = await this.sysactService.gmIns({ cmd: 'gang', guid: '0', content: `${gang_cmd}=${gang_guid}`, part_id });
    } else {
      r = await this.sysactService.gmIns({ cmd: 'gang', guid: '0', content: `${gang_cmd}=${gang_guid}=${params}`, part_id });
    }
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }

}

module.exports = GangController;
