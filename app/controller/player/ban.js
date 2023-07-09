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
    const { end, reason, uid, part_id, type, guid } = this.ctx.request.body;
    const r = await this.banService.banAccount({ type, flag: 0, time: end, reason, uid: `${uid}`, part_id, guid });
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
    const { reason, uid, part_id, type, guid } = this.ctx.request.body;
    const r = await this.banService.banAccount({ type, flag: 1, time: 0, reason, uid: `${uid}`, part_id, guid });
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
   * 封号状态
   */
  async banAccountLog() {
    const r = await this.banService.banAccountLog({ ...this.ctx.request.body, uid: `${this.ctx.request.body.uid}` });
    this.ctx.body = this.success(r);
  }

  /**
   * POST /api/player/playerinfo/ban-talk-info
   * 禁言状态
   */
  async banTalkLog() {
    const r = await this.banService.banTalkLog(this.ctx.request.body);
    this.ctx.body = this.success(r);
  }

  // POST /api/player/playerinfo/black-list-info
  async blackListInfo() {
    const r = await this.banService.blackListInfo(this.ctx.request.body);
    this.ctx.body = this.success(r);
  }

  // POST /api/player/ban/set-black-list
  async setBlackList() {
    const r = await this.banService.setBlackList(this.ctx.request.body);
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }
}

module.exports = BanController;
