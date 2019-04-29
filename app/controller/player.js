'use strict';

/**
 * 玩家信息相关控制器
 */

const BaseController = require('./base');

class PlayerController extends BaseController {

  constructor(props) {
    super(props);
    this.logger.info(this.ctx.request.body);
    this.playerService = this.ctx.service.player;
  }

  /**
   * POST player/list
   * 玩家列表
   */
  async list() {
    const result = await this.playerService.list({});
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/basicInfo
   * 玩家基本信息
   */
  async basicInfo() {
    const result = await this.playerService.basicInfo({});
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/bagInfo
   * 玩家背包信息
   */
  async bagInfo() {
    const result = await this.playerService.bagInfo({});
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/wareHouseInfo
   * 玩家仓库信息
   */
  async wareHouseInfo() {
    const result = await this.playerService.wareHouseInfo({});
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/equipInfo
   * 玩家装备信息
   */
  async equipInfo() {
    const result = await this.playerService.equipInfo({});
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/equipInfo
   * 玩家技能信息
   */
  async skillInfo() {
    const result = await this.playerService.skillInfo({});
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/titleInfo
   * 玩家称号信息
   */
  async titleInfo() {
    const result = await this.playerService.titleInfo({});
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/petInfo
   * 玩家宠物信息
   */
  async petInfo() {
    const result = await this.playerService.petInfo({});
    this.ctx.body = this.success(result);
  }

  /**
   * POST player/taskInfo
   * 玩家任务信息
   */
  async taskInfo() {
    const result = await this.playerService.taskInfo({});
    this.ctx.body = this.success(result);
  }
}

module.exports = PlayerController;
