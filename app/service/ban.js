'use strict';

/**
 * 玩家操作 -- 封号禁言
 */

const BaseReqService = require('./basereq');

class BanService extends BaseReqService {
  // 封号/解封
  // flag: 0封号 1解封
  async banAccount({ uid, flag, time, reason }) {
    console.log({ uid, flag, time, reason });
    const r = await this.request({ cmd: 3005 }, { uid, flag, reason, time }, [ 'uid', 'flag', 'time', 'reason' ]);
    if (!this.is_success(r)) return false;
    return true;
  }

  // 禁言/解除禁言
  // flag: 0禁言 1解禁
  async banTalk({ guid, flag, time, reason }) {
    console.log({ guid, flag, time, reason });
    const r = await this.request({ cmd: 3009 }, { guid, flag, reason, time }, [ 'guid', 'flag', 'time', 'reason' ]);
    if (!this.is_success(r)) return false;
    return true;
  }

  // 禁言记录
  async banTalkLog({ guid, part_id }) {
    const r = await this.request({ cmd: 3011 }, { guid, part_id }, [ 'guid' ]);
    if (!r) return [];
    if (r.data && r.data.body && r.data.body.black_list) {
      return r.data.body.black_list;
    }
    return [];
  }

  // 封号记录
  async banAccountLog({ uid, part_id }) {
    const r = await this.request({ cmd: 3007 }, { uid, part_id }, [ 'uid' ]);
    if (!r) return [];
    if (r.data && r.data.body && r.data.body.black_list) {
      return r.data.body.black_list;
    }
    return [];
  }
}

module.exports = BanService;
