'use strict';

/**
 * 玩家操作 -- GM操作相关
 */

const BaseReqService = require('./basereq');

class GmactService extends BaseReqService {
  // 给玩家发放东西（通过邮件）
  async award({ guid, reason, award_list, part_id }) {
    const r = await this.request(
      { cmd: 2003 },
      { guid, reason, award_list, part_id },
      ['guid', 'reason']
    );
    if (!this.is_success(r)) return false;
    return true;
  }

  // 给玩家发放东西（直接修改）
  async awardD({ guid, type, id, cnt, param, part_id }) {
    const r = await this.request(
      { cmd: 2001 },
      { guid, type, id, cnt, param, part_id },
      ['guid', 'type', 'id', 'cnt', 'param']
    );
    if (!this.is_success(r)) return false;
    return true;
  }

  // type: 类型,3等级/4修炼等级/5炼符等级
  // value_type:
  //  type为等级时传-1
  //  type为修炼等级是表示修炼属性类型，0生命/1法力/2攻击/3物防/4法防/5速度/6状态/7封印/8敏捷
  //  type为炼符等级是表示资质属性类型，0生命/1物防/2攻击/3法防/4速度/5封印
  async changePetData({ guid, pet_guid, type, value_type, new_value }) {
    const r = await this.request(
      { cmd: 2007 },
      { guid, pet_guid, type, value_type, new_value },
      ['guid', 'pet_guid', 'type', 'value_type', 'new_value']
    );
    if (!this.is_success(r)) return false;
    return true;
  }

  // 修改玩家数据
  // type: 类型,1等级/2称号
  async changePlayerData({ guid, part_id, type, new_value }) {
    const r = await this.request(
      { cmd: 2005 },
      { guid, part_id, type, new_value },
      ['guid', 'type', 'new_value']
    );
    if (!this.is_success(r)) return false;
    return true;
  }

  // 踢玩家下线
  async forcedown({ guid, part_id }) {
    const r = await this.request({ cmd: 2009 }, { guid, part_id }, ['guid']);
    if (!this.is_success(r)) return false;
    return true;
  }

  // 密码修改
  async changePass({ uid, new_passwd, part_id }) {
    const r = await this.request(
      { cmd: 3015 },
      { uid: `${uid}`, new_passwd, part_id },
      ['uid', 'new_passwd']
    );
    if (!this.is_success(r)) return false;
    return true;
  }

  // 解除绑定手机
  async untiePhone({ uid, part_id }) {
    const r = await this.request({ cmd: 3017 }, { uid: `${uid}`, part_id }, [
      'uid',
    ]);
    if (!this.is_success(r)) return false;
    return true;
  }

  async untieR2({uid, part_id}) {
    const r = await this.request({cmd: 3045}, { uid: `${uid}`, part_id }, [
      'uid',
    ]);
    if (!this.is_success(r)) return false;
    return true;
  }

  // 充值补发
  async reissue({ guid, part_id, pay_type, cp_order_id, diamond_id }) {
    const r = await this.request(
      { cmd: 3037 },
      {
        guid: `${guid}`,
        pay_type: parseInt(pay_type),
        cp_order_id: `${cp_order_id}`,
        diamond_id: parseInt(diamond_id),
        part_id,
      },
      ['guid', 'pay_type', 'cp_order_id', 'diamond_id']
    );
    if (!this.is_success(r)) return false;
    return true;
  }

  // 删除邮件
  async delMail({ guid, part_id, mail_id_list }) {
    const r = await this.request({ cmd: 3023 }, { guid: `${guid}`, mail_id_list, part_id }, ['guid']);
    if (!this.is_success(r)) return false;
    return true;
  }
}

module.exports = GmactService;
