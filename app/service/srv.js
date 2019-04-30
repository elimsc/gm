'use strict';

const BaseReqService = require('./basereq');

/**
 * 服务器列表
 */
class SrvService extends BaseReqService {
  async list() {
    const result = await this.request({ cmd: 3001 });
    if (!result) return [];
    if (result.data && result.data.body && result.data.body.partlist) {
      return result.data.body.partlist;
    }
    return [];
  }
}

module.exports = SrvService;
