'use strict';

/**
 * 批量操作
 */

const BaseController = require('./base');

class BatchActController extends BaseController {

  constructor(props) {
    super(props);
    this.gmactService = this.ctx.service.gmact;
    this.banService = this.ctx.service.ban;
  }

  async banTalk() {
    const err_guids = [];
    const { items, reason, part_id } = this.ctx.request.body;
    for (const item of items) {
      const r = this.banService.banAccount({ guid: item[0], time: parseInt((`${item[1]}`).substr(0, 10)), flag: 1, reason, part_id });
      if (!r) {
        err_guids.push(item[0]);
      }
    }
    if (err_guids.length === 0) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.success({}, '', err_guids);
    }
  }

  async banAccount() {
    const err_uids = [];
    const { items, reason, part_id } = this.ctx.request.body;
    for (const item of items) {
      const r = this.banService.banAccount({ uid: item[0], time: parseInt((`${item[1]}`).substr(0, 10)), flag: 1, reason, part_id });
      if (!r) {
        err_uids.push(item[0]);
      }
    }
    if (err_uids.length === 0) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.success({}, '', err_uids);
    }
  }


  /**
   * POST batchact/award
   * 批量发放道具
   */
  async award() {
    const { reason, awards, part_id } = this.ctx.request.body;
    const award_lists = [];
    for (const award of awards) {
      const title = award[0].map(item => item.trim());
      const award_content = award.filter((item, i) => i !== 0);
      for (const item of award_content) {
        award_lists.push({
          [title[0]]: item[0],
          [title[1]]: item[1],
          [title[2]]: item[2],
          [title[3]]: item[3],
          [title[4]]: item[4],
        });
      }
    }

    const awards_with_guid = {};
    for (const item of award_lists) {
      if (item.guid in awards_with_guid) {
        awards_with_guid[item.guid].push({
          type: item.type,
          id: item.id,
          cnt: item.cnt,
          param: item.param,
        });
      } else {
        awards_with_guid[item.guid] = [{
          type: item.type,
          id: item.id,
          cnt: item.cnt,
          param: item.param,
        }];
      }
    }

    // 构建请求值的列表
    const all_awards = Object.keys(awards_with_guid).map(guid => {
      return {
        guid,
        reason,
        award_list: awards_with_guid[guid],
        part_id,
      };
    });

    // 依次请求后端
    const err_guid = []; // 操作失败的guid
    for (const item of all_awards) {
      const r = await this.gmactService.award(item);
      if (!r) {
        err_guid.push(item.guid);
      }
    }

    if (err_guid.length === 0) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.success({}, '', err_guid);
    }
  }


}

module.exports = BatchActController;
