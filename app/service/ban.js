'use strict';

/**
 * 玩家操作 -- 封号禁言
 */

const BaseReqService = require('./basereq');

class BanService extends BaseReqService {
  // 封号/解封
  // flag: 0封号 1解封
  async banAccount({ type, uid, flag, time, reason, part_id, guid }) {
    const r = await this.request({ cmd: 3005 }, { type, uid, flag, reason, time: parseInt((`${time}`).substr(0, 10)), part_id, guid }, ['type', 'guid', 'uid', 'flag', 'time', 'reason']);
    // console.log(r);
    if (!this.is_success(r)) return false;
    return true;
  }

  // 通过guid封号/解封
  async banAccountByGuid({ type, guid, flag, time, reason, part_id }) {
    const players = await this.ctx.service.playerinfo.list({ name: guid, type: 1, part_id });
    if (players.length == 0) {
      return false;
    }
    const player = players[0];
    const r = await this.banAccount({ type, guid, flag, time, reason, part_id, uid: `${player.uid}` });
    return r;
  }

  // 禁言/解除禁言
  // flag: 0禁言 1解禁
  async banTalk({ guid, flag, time, reason, part_id }) {
    const r = await this.request({ cmd: 3009 }, { guid, flag, reason, time: parseInt((`${time}`).substr(0, 10)), part_id }, ['guid', 'flag', 'time', 'reason']);
    if (!this.is_success(r)) return false;
    return true;
  }

  // 禁言记录（禁言状态）
  async banTalkLog({ guid, part_id }) {
    const r = await this.request({ cmd: 3011 }, { guid, part_id }, ['guid']);
    if (!r) return [];
    if (r.data && r.data.body) {
      const src = r.data.body;
      const tpl = {
        guid: '角色GUID',
        end_time: '禁言截止时间',
      };

      const end_time_map = end_time => {
        switch (end_time) {
          case 0: return '未禁言';
          default: return this.prettyTime(end_time);
        }
      };

      const fns = { end_time: end_time_map };
      return this.ctx.helper.tableInfoConv(src, tpl, fns);
    }
    return [];
  }

  // 封号记录（封号状态）
  async banAccountLog({ uid, part_id, guid }) {
    const r = await this.request({ cmd: 3007 }, { uid, part_id, guid }, ['guid', 'uid']);
    if (!r) return [];
    if (r.data && r.data.body && r.data.body) {
      const src = r.data.body;
      const tpl = {
        uid: '账户UID',
        part_id: '区服',
        end_time: '封号截止时间',
        gm_time: 'GM操作时间',
        type: '封号级别',
      };

      const end_time_map = end_time => {
        switch (end_time) {
          case 0: return '未封号';
          default: return this.prettyTime(end_time);
        }
      };

      const type_map = type => {
        switch (type) {
          case 0: return '账号';
          case 1: return '手机号';
          case 2: return '身份证号';
          default: return type;
        }
      };

      const fns = { end_time: end_time_map, gm_time: this.prettyTime, type: type_map };
      return this.ctx.helper.tableInfoConv(src, tpl, fns);
    }
    return [];
  }
}

module.exports = BanService;
