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

  // 查询现在支付黑白名单
  async listPayBlacklist({ part_id, mode }) {
    const r = await this.request({ cmd: 3019 }, { mode, part_id }, ['mode']);
    try {
      return r.data.body.list;
    } catch (e) {
      return [];
    }
  }

  // 增删现在支付黑白名单
  async updatePayBlacklist({ part_id, mode, add_list, del_list }) {
    const r = await this.request({ cmd: 3021 }, { mode, part_id, add_list, del_list }, ['mode']);
    // console.log(r);
    if (!this.is_success(r)) return false;
    return true;
  }
}

module.exports = SysactService;
