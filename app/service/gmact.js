'use strict';

/**
 * 玩家操作 -- GM操作相关
 */

const BaseReqService = require('./basereq');

class GmactService extends BaseReqService {

  // 给玩家发放东西（通过邮件）
  //  "reason" : "",  //操作原因-会显示在邮件内容中，不超过100个汉字
  //	award_list: [{
  //		"type" : ,      //类型,0经验/1货币/2道具/3宠物经验/4帮会资金/5帮会资历
  //		"id" : ,       	//type为道具时表示道具ID，货币时表示0银两/1仙缘/2点券/3帮贡/4门派威望/5侠义值/6绑定仙缘/7恩爱值/8队长值/，其他填-1
  //		"cnt" : ,       //数量（正加负减）
  //		"param" : ,     //扩展参数：默认-1表示无效，type为道具时填写道具扩展ID
  //	}]
  async award({ guid, reason, award_list, part_id }) {
    console.log({ guid, reason, award_list, part_id });
    const r = await this.request({ cmd: 2003 }, { guid, reason, award_list, part_id }, [ 'guid', 'reason' ]);
    if (!this.is_success(r)) return false;
    return true;
  }

  // 设置玩家等级
  async setPlayerLevel({ guid, new_level, part_id }) {
    const r = await this.request({ cmd: 2005 }, { guid, new_level, part_id }, [ 'guid', 'new_level' ]);
    if (!this.is_success(r)) return false;
    return true;
  }

  // 设置宠物等级
  async setPetLevel({ guid, pet_guid, new_level, part_id }) {
    const r = await this.request({ cmd: 2005 }, { guid, new_level, part_id, pet_guid }, [ 'guid', 'pet_guid', 'new_level' ]);
    if (!this.is_success(r)) return false;
    return true;
  }

  // 发放道具
  async prop() {
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
