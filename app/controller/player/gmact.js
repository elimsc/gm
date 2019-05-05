'use strict';

/**
 * 玩家操作 -- GM操作
 */

const BaseController = require('../base');

class GmactController extends BaseController {
  constructor(props) {
    super(props);
    this.gmactService = this.ctx.service.gmact;
  }

  /**
   * POST /player/gmact/money
   * 发放货币
   */
  async money() {
    await this.gmactService.money(this.ctx.request.body);
    this.ctx.body = this.success();
  }

  /**
   * POST /player/gmact/prop
   * 发放道具
   */
  async prop() {
    await this.gmactService.money(this.ctx.request.body);
    this.ctx.body = this.success();
  }

  /**
   * POST /player/gmact/exp
   * 添加/扣除经验
   */
  async exp() {
    await this.gmactService.exp(this.ctx.request.body);
    this.ctx.body = this.success();
  }

  /**
   * POST /player/gmact/titlem
   * 添加删除称号
   */
  async titlem() {
    await this.gmactService.titlem(this.ctx.request.body);
    this.ctx.body = this.success();
  }

  /**
   * POST /player/gmact/prac-level
   * 修改修炼等级
   */
  async pracLevel() {
    await this.gmactService.pracLevel(this.ctx.request.body);
    this.ctx.body = this.success();
  }

  /**
   * POST /player/gmact/petsymbol-level
   * 宠物符等级
   */
  async petsymbolLevel() {
    await this.gmactService.petsymbolLevel(this.ctx.request.body);
    this.ctx.body = this.success();
  }

  /**
   * POST /player/gmact/forcedown
   * 踢玩家下线
   */
  async forcedown() {
    await this.gmactService.forcedown(this.ctx.request.body);
    this.ctx.body = this.success();
  }

  /**
   * POST /player/gmact/secure-code
   * 安全码修改
   */
  async secureCode() {
    await this.gmactService.secureCode(this.ctx.request.body);
    this.ctx.body = this.success();
  }

  /**
   * POST /player/gmact/change-pass
   * 密码修改
   */
  async changePass() {
    await this.gmactService.changePass(this.ctx.request.body);
    this.ctx.body = this.success();
  }

  /**
   * POST /player/gmact/untie-phone
   * 解除绑定手机
   */
  async untiePhone() {
    await this.gmactService.untiePhone(this.ctx.request.body);
    this.ctx.body = this.success();
  }

}

module.exports = GmactController;
