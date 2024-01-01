'use strict';

/**
 * 玩家操作 -- 玩家信息
 */

const BaseController = require('../base');

class PlayerInfoController extends BaseController {
  constructor(props) {
    super(props);
    this.playerService = this.ctx.service.playerinfo;
  }

  /**
   * POST player/list
   * 玩家列表
   */
  async list() {
    const { name, type, part_id } = this.ctx.request.body;
    const result = await this.playerService.list({
      name,
      type: parseInt(type),
      part_id,
    });
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/list/batch
   * 批量查询玩家列表
   */
  async batchList() {
    const { names, type, part_id } = this.ctx.request.body;
    const results = [];
    for (const name of names) {
      const accounts = await this.playerService.list({
        name,
        type: parseInt(type),
        part_id,
      });
      for (const account of accounts) {
        const r = await this.playerService.basicInfo({ guid: account.guid, part_id });
        for (const item of r) {
          // 添加create_time到导出结果
          if (item.key === 'create_time') {
            account.create_time = item.value;
          }
          // 添加last_login_time到导出结果
          if (item.key === 'last_login_time') {
            account.last_login_time = item.value;
          }
        }
      }
      results.push(accounts);
    }
    this.ctx.body = this.success(results);
  }

  /**
   * POST player/playerinfo/basic-info
   * 玩家基本信息
   */
  async basicInfo() {
    const result = await this.playerService.basicInfo({
      ...this.ctx.request.body,
    });
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/playerinfo/bag-info
   * 玩家背包信息
   */
  async bagInfo() {
    const result = await this.playerService.bagInfo({
      ...this.ctx.request.body,
    });
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/playerinfo/hero-info
   */
  async heroInfo() {
    const result = await this.playerService.heroInfo({
      ...this.ctx.request.body,
    })
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/playerinfo/entrust-info
   */
  async entrustInfo() {
    const result = await this.playerService.entrustInfo({
      ...this.ctx.request.body,
    })
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/playerinfo/dress-info
   */
  async dressInfo() {
    const result = await this.playerService.dressInfo({
      ...this.ctx.request.body,
    })
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/playerinfo/warehouse-info
   * 玩家仓库信息
   */
  async wareHouseInfo() {
    const result = await this.playerService.wareHouseInfo({
      ...this.ctx.request.body,
    });
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/playerinfo/equip-info
   * 玩家装备信息
   */
  async equipInfo() {
    const result = await this.playerService.equipInfo({
      ...this.ctx.request.body,
    });
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/playerinfo/dec-info
   * 玩家饰品信息
   */
  async decInfo() {
    const result = await this.playerService.decInfo({
      ...this.ctx.request.body,
    });
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/playerinfo/skill-info
   * 玩家技能信息
   */
  async skillInfo() {
    const result = await this.playerService.skillInfo({
      ...this.ctx.request.body,
    });
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/playerinfo/title-info
   * 玩家称号信息
   */
  async titleInfo() {
    const result = await this.playerService.titleInfo({
      ...this.ctx.request.body,
    });
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/playerinfo/pet-info
   * 玩家宠物信息
   */
  async petInfo() {
    const result = await this.playerService.petInfo({
      ...this.ctx.request.body,
    });
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/playerinfo/task-info
   * 玩家任务信息
   */
  async taskInfo() {
    const result = await this.playerService.taskInfo({
      ...this.ctx.request.body,
    });
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/playerinfo/home-info
   * 玩家家园信息
   */
  async homeInfo() {
    const result = await this.playerService.homeInfo({
      ...this.ctx.request.body,
    });
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/playerinfo/email-info
   * 玩家邮件信息
   */
  async emailInfo() {
    const result = await this.playerService.emailInfo({
      ...this.ctx.request.body,
    });
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/playerinfo/marriage-info
   * 玩家家园信息
   */
  async marriageInfo() {
    const result = await this.playerService.marriageInfo({
      ...this.ctx.request.body,
    });
    this.ctx.body = this.success(result);
  }

  async entrustOffline() {
    const r = await this.playerService.entrustOffline(this.ctx.request.body);
    if (!r) {
      this.ctx.body = this.error();
    } else {
      this.ctx.body = this.success(r);
    }
  }
}

module.exports = PlayerInfoController;
