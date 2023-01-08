'use strict';

/**
 * 玩家操作 -- 封号禁言
 */

const BaseController = require('../base');

class AnnController extends BaseController {
  constructor(props) {
    super(props);
    this.annService = this.ctx.service.projectAAnn;
  }

  /**
   * POST /api/projecta/ann/create-type
   */
  async createType() {
    const {identity, name} = this.ctx.request.body;
    const r = await this.annService.createAnnType({identity, name});
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }

  async listType() {
    const r = await this.annService.listAnnType();
    this.ctx.body = this.success(r)
  }

  async updateType() {
    const {id, identity, name} = this.ctx.request.body;
    const r = await this.annService.updateAnnType({id, identity, name});
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }

  async deleteType() {
    const {id} = this.ctx.request.body;
    const r = await this.annService.deleteAnnType({id});
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }

  /**
   * POST /api/projecta/ann/create-ann
   */
   async createAnn() {
    const {label, pic, title, content, type, start_time, end_time, order} = this.ctx.request.body;
    const r = await this.annService.createAnn({label, pic, title, content, type, start_time, end_time, order});
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }

  async listAnn() {
    const {type, id} = this.ctx.query;
    const r = await this.annService.listAnn({type, id});
    this.ctx.body = this.success(r)
  }

  async updateAnn() {
    const {id, label, pic, title, content, type, start_time, end_time, order} = this.ctx.request.body;
    const r = await this.annService.updateAnn({id, label, pic, title, content, type, start_time, end_time, order});
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }

  async deleteAnn() {
    const {id} = this.ctx.request.body;
    const r = await this.annService.deleteAnn({id});
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }

  /**
   * POST /api/projecta/ann/create-subcontent
   */
  async createAnnSubcontent() {
    const {title, content, ann_id, start_time, end_time, order} = this.ctx.request.body;
    const r = await this.annService.createAnnSubcontent({title, content, ann_id, start_time, end_time, order});
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }

  async listAnnSubcontent() {
    const {type, id} = this.ctx.query;
    const r = await this.annService.listAnnSubcontent({type, id});
    this.ctx.body = this.success(r)
  }

  async updateAnnSubcontent() {
    const {id, title, content, ann_id, start_time, end_time, order} = this.ctx.request.body;
    const r = await this.annService.updateAnnSubcontent({id, title, content, ann_id, start_time, end_time, order});
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }

  async deleteAnnSubcontent() {
    const {id} = this.ctx.request.body;
    const r = await this.annService.deleteAnnSubcontent({id});
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }



}

module.exports = AnnController;
