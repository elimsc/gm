'use strict';

/**
 * 系统操作
 */

const BaseReqService = require('./basereq');

class SysactService extends BaseReqService {
  async forcedown() {
    return true;
  }

  // GM指令
  // #${cmd}=#{content}
  async gmIns({ cmd, guid, content, part_id }) {
    // console.log({ cmd, guid, content });
    const r = await this.request({ cmd: 3013 }, { cmd, guid, content, part_id }, [ 'cmd', 'guid', 'content' ]);
    // console.log(r);
    if (!this.is_success(r)) return false;
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
