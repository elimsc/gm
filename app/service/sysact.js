'use strict';

/**
 * 系统操作
 */

const BaseReqService = require('./basereq');

class SysactService extends BaseReqService {
  // GM指令
  // #${cmd}=#{content}
  async gmIns({ cmd, guid, content, part_id }) {
    // console.log({ cmd, guid, content });
    const r = await this.request({ cmd: 3013 }, { cmd, guid, content, part_id }, ['cmd', 'guid', 'content']);
    // console.log(r);
    if (!this.is_success(r)) return false;
    return true;
  }
}

module.exports = SysactService;
