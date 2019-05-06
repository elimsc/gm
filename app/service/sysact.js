'use strict';

/**
 * 系统操作
 */

const BaseReqService = require('./basereq');

class SysactService extends BaseReqService {
  async forcedown() {
    return true;
  }

  async gmIns() {
    return true;
  }

  // 更新活动信息
  async updateActivity() {
    return true;
  }

  // 获取活动信息
  async fetchActivity() {
    return [];
  }
}

module.exports = SysactService;
