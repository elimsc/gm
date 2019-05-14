'use strict';

const BaseReqService = require('./basereq');

/**
 * 服务器广播
 */
class BroadcastService extends BaseReqService {
  async broadcast({ msg, interval, time }) {
    const r = await this.request({ cmd: 3003 }, { msg, interval, time }, ['msg', 'interval', 'time']);
    if (!this.is_success(r)) return false;
    return true;
  }
}

module.exports = BroadcastService;
