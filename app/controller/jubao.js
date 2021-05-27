'use strict';
/**
 * 举报信息查询
 */

const BaseController = require('./base');

class JubaoController extends BaseController {
  constructor(props) {
    super(props);
    this.jubaoService = this.ctx.service.jubao;
    this.banService = this.ctx.service.ban;
  }


  /**
   * 按被举报人的guid 列表
   */
  async listGroupByTargetGuid() {
    const list = await this.jubaoService.listGroupByTargetGuid();
    this.ctx.body = this.success(list);
  }

  /**
   * 根据被举报人的guid 获取详情列表, 一个guid对应多个值
   */
  async detailByTargetGuid() {
    const guid = this.ctx.request.query['guid'];
    const detailList = await this.jubaoService.detailByTargetGuid(guid);
    this.ctx.body = this.success(detailList);
  }

  /**
   * 删除target_guid值为目标guid对应的所有记录
   */
  async deleteByTargetGuid() {
    const { guid } = this.ctx.request.body;
    const r = this.jubaoService.deleteByTargetGuid(guid);
    this.ctx.body = this.success(r);
  }

  /**
  * POST jubao/ban
  * 封号
  */
  async ban() {
    const { part_id, guid } = this.ctx.request.body;
    const r = await this.banService.banAccountByGuid({ type: -1, flag: 0, time: 0, reason: '举报页面封号', part_id, guid });
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }

  /**
  * POST jubao/banTalk
  * 禁言
  */
  async banTalk() {
    const { part_id, guid } = this.ctx.request.body;
    const r = await this.banService.banTalk({ flag: 0, time: 0, reason: '举报页面禁言', part_id, guid });
    if (r) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.error();
    }
  }
}

module.exports = JubaoController;
