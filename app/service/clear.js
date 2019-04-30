'use strict';

/**
 * 玩家操作 -- 清除数据
 */

const BaseReqService = require('./basereq');

class ClearService extends BaseReqService {
  // 清除安全码
  async clearSecureCode() {
    return true;
  }

  // 清除非正常帮会数据
  async clearUnGang() {
    return true;
  }

  // 清除非正常任务
  async clearUnTask() {
    return true;
  }
}

module.exports = ClearService;
