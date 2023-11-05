'use strict';

const BaseReqService = require('./basereq');

/**
 * 服务器列表
 */
class SrvService extends BaseReqService {
  async list() {
    const result = await this.request({ cmd: 3001 });
    if (!result) return [];
    if (result.data && result.data.body) {
      return result.data.body;
    }
    return [];
  }
}

module.exports = SrvService;
