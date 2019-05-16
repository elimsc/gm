'use strict';

/**
 * 玩家操作 -- GM操作相关
 */

const BaseReqService = require('./basereq');

class GmactService extends BaseReqService {

  // 给玩家发放东西（通过邮件）
  async award({ guid, reason, award_list, part_id }) {
    const r = await this.request({ cmd: 2003 }, { guid, reason, award_list, part_id }, [ 'guid', 'reason' ]);
    console.log(r);
    if (!this.is_success(r)) return false;
    return true;
  }

  // type: 类型,3等级/4修炼等级/5炼符等级
  // value_type:
  //  type为等级时传-1
  //  type为修炼等级是表示修炼属性类型，0生命/1法力/2攻击/3物防/4法防/5速度/6状态/7封印/8敏捷
  //  type为炼符等级是表示资质属性类型，0生命/1物防/2攻击/3法防/4速度/5封印
  async changePetData({ guid, pet_guid, type, value_type, new_value }) {
    const r = await this.request({ cmd: 2007 }, { guid, pet_guid, type, value_type, new_value }, [ 'guid', 'pet_guid', 'type', 'value_type', 'new_value' ]);
    if (!this.is_success(r)) return false;
    return true;
  }

  // 修改玩家数据
  // type: 类型,1等级/2称号
  async changePlayerData({ guid, part_id, type, new_value }) {
    const r = await this.request({ cmd: 2005 }, { guid, part_id, type, new_value }, [ 'guid', 'type', 'new_value' ]);
    if (!this.is_success(r)) return false;
    return true;
  }


  // 添加/扣除经验
  async exp() {
    return true;
  }

  // 添加删除称号
  async titlem({ guid, part_id, title_id, is_del }) {
    const r = await this.request({ cmd: 2009 }, { guid, part_id, title_id, is_del }, [ 'guid', 'title_id', 'is_del' ]);
    console.log(r);
    if (!this.is_success(r)) return false;
    return true;
  }

  // 修改修炼等级
  async pracLevel() {
    return true;
  }

  // 宠物符等级
  async petsymbolLevel() {
    return true;
  }

  // 踢玩家下线
  async forcedown() {
    return true;
  }

  // 安全码修改
  async secureCode() {
    return true;
  }

  // 密码修改
  async changePass() {
    return true;
  }

  // 解除绑定手机
  async untiePhone() {
    return true;
  }
}

module.exports = GmactService;
