'use strict';

/**
 * 玩家操作 -- 封号禁言
 */

const BaseController = require('../base');

class BanController extends BaseController {
  constructor(props) {
    super(props);
    this.banService = this.ctx.service.ban;
  }

  /**
   * POST /api/player/ban/account
   * 封号
   */
  async banAccount() {
    const { end, reason, uid, part_id } = this.ctx.request.body;
    const r = await this.banService.banAccount({ flag: 0, time: end, reason, uid, part_id });
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }

  /**
   * POST /api/player/ban/account-r
   * 解除封号
   */
  async removeAccountBan() {
    const { reason, uid, part_id } = this.ctx.request.body;
    const r = await this.banService.banAccount({ flag: 1, time: 0, reason, uid, part_id });
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }

  /**
   * POST /api/player/ban/talk
   * 禁言
   */
  async banTalk() {
    const { end, reason, guid, part_id } = this.ctx.request.body;
    const r = await this.banService.banTalk({ flag: 0, time: end, reason, guid, part_id });
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }

  /**
   * POST /api/player/ban/talk-r
   * 解除禁言
   */
  async removeTalkBan() {
    const { reason, guid, part_id } = this.ctx.request.body;
    const r = await this.banService.banTalk({ flag: 1, time: 0, reason, guid, part_id });
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }

  /**
   * POST /api/player/playerinfo/ban-account-info
   * 封号记录
   */
  async banAccountLog() {
    const r = await this.banService.banAccountLog(this.ctx.request.body);
    this.ctx.body = this.success(r);
  }

  /**
   * POST /api/player/playerinfo/ban-talk-info
   * 封号记录
   */
  async banTalkLog() {
    const r = await this.banService.banTalkLog(this.ctx.request.body);
    this.ctx.body = this.success(r);
  }
}

module.exports = BanController;
