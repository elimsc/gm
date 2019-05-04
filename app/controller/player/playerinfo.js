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
    const result = await this.playerService.list({ name, type: parseInt(type), part_id });
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/playerinfo/basic-info
   * 玩家基本信息
   */
  async basicInfo() {
    const result = await this.playerService.basicInfo({ ...this.ctx.request.body });
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/playerinfo/bag-info
   * 玩家背包信息
   */
  async bagInfo() {
    const result = await this.playerService.bagInfo({ ...this.ctx.request.body });
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/playerinfo/warehouse-info
   * 玩家仓库信息
   */
  async wareHouseInfo() {
    const result = await this.playerService.wareHouseInfo({ ...this.ctx.request.body });
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/playerinfo/equip-info
   * 玩家装备信息
   */
  async equipInfo() {
    const result = await this.playerService.equipInfo({ ...this.ctx.request.body });
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/playerinfo/skill-info
   * 玩家技能信息
   */
  async skillInfo() {
    const result = await this.playerService.skillInfo({ ...this.ctx.request.body });
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/playerinfo/title-info
   * 玩家称号信息
   */
  async titleInfo() {
    const result = await this.playerService.titleInfo({ ...this.ctx.request.body });
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/playerinfo/pet-info
   * 玩家宠物信息
   */
  async petInfo() {
    const result = await this.playerService.petInfo({ ...this.ctx.request.body });
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/playerinfo/task-info
   * 玩家任务信息
   */
  async taskInfo() {
    const result = await this.playerService.taskInfo({ ...this.ctx.request.body });
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/playerinfo/home-info
   * 玩家家园信息
   */
  async homeInfo() {
    const result = await this.playerService.homeInfo({ ...this.ctx.request.body });
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/playerinfo/email-info
   * 玩家邮件信息
   */
  async emailInfo() {
    const result = await this.playerService.emailInfo({ ...this.ctx.request.body });
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/playerinfo/marriage-info
   * 玩家家园信息
   */
  async marriageInfo() {
    const result = await this.playerService.marriageInfo({ ...this.ctx.request.body });
    this.ctx.body = this.success(result);
  }
}

module.exports = PlayerInfoController;
