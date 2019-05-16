'use strict';

const BaseReqService = require('./basereq');

/**
 * 服务器广播
 */
class BroadcastService extends BaseReqService {
  async broadcast({ msg, interval, time, part_id }) {
    const r = await this.request({ cmd: 3003 }, { msg, interval, time, part_id }, [ 'msg', 'interval', 'time' ]);
    if (!this.is_success(r)) return false;
    return true;
  }
}

module.exports = BroadcastService;
