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
    const { guid, part_id, counts, names, reason } = this.ctx.request.body;
    const award_list = names.map((name, i) => {
      return { type: 1, id: name, cnt: parseInt(counts[i]), param: -1 };
    });
    const r = await this.gmactService.award({ guid, part_id, reason, award_list });
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }

  /**
   * POST /player/gmact/prop
   * 发放道具
   */
  async prop() {
    const { guid, part_id, counts, names, reason, params } = this.ctx.request.body;
    const award_list = names.map((name, i) => {
      return { type: 2, id: parseInt(name), cnt: parseInt(counts[i]), param: params[i] ? parseInt(params[i]) : -1 };
    });
    const r = await this.gmactService.award({ guid, part_id, reason, award_list });
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }

  /**
   * POST /player/gmact/exp
   * 物品发放 -- 玩家经验
   */
  async exp() {
    const { guid, reason, jingyan, part_id } = this.ctx.request.body;
    const award_list = [{ type: 0, id: -1, cnt: parseInt(jingyan), param: -1 }];
    const r = await this.gmactService.award({ guid, reason, part_id, award_list });
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }

  /**
   * POST /player/gmact/add-title
   * 添加称号
   */
  async addTitle() {
    const { guid, part_id, title } = this.ctx.request.body;
    const r = await this.gmactService.titlem({ type: 2, guid, part_id, title_id: title });
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }

  /**
   * POST /player/gmact/del-title
   * 删除称号
   */
  async delTitle() {
    const { guid, part_id, title } = this.ctx.request.body;
    const r = await this.gmactService.titlem({ type: 1, guid, part_id, title_id: title });
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
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
