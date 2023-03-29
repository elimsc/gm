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
   * 发放货币（邮件）
   */
  async money() {
    const { guid, part_id, counts, names, reason } = this.ctx.request.body;
    const award_list = names.map((name, i) => {
      return { type: 1, id: name, cnt: parseInt(counts[i]), param: 0 };
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
   * 发放道具（邮件）
   */
  async prop() {
    const { guid, part_id, counts, names, reason, params } = this.ctx.request.body;
    const award_list = names.map((name, i) => {
      return { type: 2, id: parseInt(name), cnt: parseInt(counts[i]), param: params[i] ? parseInt(params[i]) : 0 };
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
   * 物品发放 -- 玩家经验（邮件）
   */
  async exp() {
    const { guid, reason, jingyan, part_id } = this.ctx.request.body;
    const award_list = [{ type: 0, id: -1, cnt: parseInt(jingyan), param: 0 }];
    const r = await this.gmactService.award({ guid, reason, part_id, award_list });
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }

  /**
   * POST player/gmact/pet-exp
   * 物品发放 -- 宠物经验
   */
  // async petExp() {
  //   this.ctx.body = this.success();
  // }

  /**
   * POST player/gmact/pet-level
   * 设置宠物等级
   */
  async setPetLevel() {
    const { guid, level, part_id, pet_guid } = this.ctx.request.body;
    const r = await this.gmactService.changePetData({ guid, new_value: parseInt(level), part_id, pet_guid, value_type: -1, type: 3 });
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }

  /**
   * POST player/gmact/pet-praclevel
   * 设置宠物修炼等级
   */
  async setPetPraclevel() {
    const { guid, level, part_id, pet_guid, type } = this.ctx.request.body;
    const r = await this.gmactService.changePetData({ guid, new_value: parseInt(level), part_id, pet_guid, value_type: type, type: 4 });
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }

  /**
   * OIST player/gmact/pet-lflevel
   * 设置宠物炼符等级
   */
  async setPetLflevel() {
    const { guid, level, part_id, pet_guid, type } = this.ctx.request.body;
    const r = await this.gmactService.changePetData({ guid, new_value: parseInt(level), part_id, pet_guid, value_type: type, type: 5 });
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }

  /**
   * POST player/gmact/set-player-level
   * 设置玩家等级
   */
  async setPlayerLevel() {
    const { guid, level, part_id } = this.ctx.request.body;
    const r = await this.gmactService.changePlayerData({ guid, new_value: parseInt(level), part_id, type: 1 });
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
    const { guid, part_id, title_id } = this.ctx.request.body;
    const r = await this.gmactService.changePlayerData({ type: 2, guid, part_id, new_value: parseInt(title_id) });
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
    const { guid, part_id, title_id } = this.ctx.request.body;
    const r = await this.gmactService.changePlayerData({ type: 2, guid, part_id, new_value: parseInt(`-${title_id}`) });
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
  // async pracLevel() {
  //   await this.gmactService.pracLevel(this.ctx.request.body);
  //   this.ctx.body = this.success();
  // }

  /**
   * POST /player/gmact/petsymbol-level
   * 宠物符等级
   */
  // async petsymbolLevel() {
  //   await this.gmactService.petsymbolLevel(this.ctx.request.body);
  //   this.ctx.body = this.success();
  // }

  /**
   * POST /player/gmact/forcedown
   * 踢玩家下线
   */
  async forcedown() {
    const r = await this.gmactService.forcedown(this.ctx.request.body);
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }


  /**
   * POST /player/gmact/change-pass
   * 密码修改
   */
  async changePass() {
    const { uid, part_id, value } = this.ctx.request.body;
    const r = await this.gmactService.changePass({ uid, part_id, new_passwd: value });
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }

  /**
   * POST /player/gmact/untie-phone
   * 解除绑定手机
   */
  async untiePhone() {
    const r = await this.gmactService.untiePhone(this.ctx.request.body);
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }

   /**
   * POST /player/gmact/untie-r2
   * 解除R2Game账号绑定
   */
   async untieR2() {
    const r = await this.gmactService.untieR2(this.ctx.request.body);
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }

  /**
   * POST player/gmact/award-d
   * 物品发放（直接修改）
   */
  async awardD() {
    const { guid, type, id, cnt, param, part_id } = this.ctx.request.body;
    const r = this.gmactService.awardD({ guid, type, id, cnt: parseInt(cnt), param, part_id });
    if (!r) {
      this.ctx.body = this.error();
    } else {
      this.ctx.body = this.success();
    }
  }

  /**
   * POST player/gmact/reissue
   * 充值补发
   */
  async reissue() {
    const r = this.gmactService.reissue(this.ctx.request.body);
    if (!r) {
      this.ctx.body = this.error();
    } else {
      this.ctx.body = this.success();
    }
  }

  /**
   * POST player/gmact/del-mail
   * 删除邮件
   */
  async delMail() {
    const r = this.gmactService.delMail(this.ctx.request.body);
    if (!r) {
      this.ctx.body = this.error();
    } else {
      this.ctx.body = this.success();
    }
  }

}

module.exports = GmactController;
