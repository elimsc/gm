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

  async gmIns({command, gang_id, gang_guid, string_param, int_param}) {
    if (!int_param) {
      int_param = 0
    }
    if (!string_param) {
      string_param = ""
    }
    const r = await this.request({cmd: 4005}, {command, gang_id, guid: gang_guid, string_param, int_param: parseInt(int_param)}, ['command', 'gang_id', 'guid']);
    if (!this.is_success(r)) return false;
    return true;
  }
}

module.exports = GangService;
