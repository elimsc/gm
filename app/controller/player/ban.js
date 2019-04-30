'use strict';

/**
 * 玩家操作 -- 封号禁言
 */

const BaseController = require('../base');

class BanController extends BaseController {
  constructor(props) {
    super(props);
    this.banService = this.ctx.service.ban;
    this.logger.info(this.ctx.request.body);
  }

  /**
   * POST /api/player/ban/account
   * 封号
   */
  async banAccount() {
    await this.banService.banAccount();
    this.ctx.body = this.success();
  }

  /**
   * POST /api/player/ban/log
   * 禁言记录
   */
  async banLog() {
    await this.banService.banLog();
    this.ctx.body = this.success();
  }

  /**
   * POST /api/player/ban/talk
   * 禁言
   */
  async banTalk() {
    await this.banService.banAccount();
    this.ctx.body = this.success();
  }

}

module.exports = BanController;
