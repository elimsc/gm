'use strict';

/**
 * 玩家操作 -- GM操作相关
 */

const BaseReqService = require('./basereq');

class GmactService extends BaseReqService {

  // 发放货币
  async money() {
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
  async titlem() {
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
