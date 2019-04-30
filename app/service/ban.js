'use strict';

/**
 * 玩家操作 -- 封号禁言
 */

const BaseReqService = require('./basereq');

class BanService extends BaseReqService {
  // 封号
  async banAccount() {
    return true;
  }

  // 禁言
  async banTalk() {
    return true;
  }

  // 禁言记录
  async banLog() {
    return true;
  }
}

module.exports = BanService;
