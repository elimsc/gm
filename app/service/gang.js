'use strict';

/**
 * 帮会操作
 */

const BaseReqService = require('./basereq');

class GangService extends BaseReqService {
  // 帮会列表
  async list({ part_id }) {
    const result = await this.request({ cmd: 4001 }, { part_id }, []);
    try {
      return result.data.body.ganglist;
    } catch (e) {
      return [];
    }
  }

  // 帮会信息
  async info({ part_id, gang_guid }) {
    const result = await this.request({ cmd: 4003 }, { part_id, guid: gang_guid }, ['guid']);
    try {
      return result.data.body;
    } catch (e) {
      return [];
    }
  }
}

module.exports = GangService;
