'use strict';

const BaseReqService = require('./basereq');

/**
 * 服务器广播
 */
class BroadcastService extends BaseReqService {
  async broadcast() {
    return true;
  }
}

module.exports = BroadcastService;
