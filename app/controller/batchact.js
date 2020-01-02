'use strict';

/**
 * 批量操作
 */
const BaseController = require('./base');
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const MultiStream = require('multistream');

class BatchActController extends BaseController {

  constructor(props) {
    super(props);
    this.gmactService = this.ctx.service.gmact;
    this.banService = this.ctx.service.ban;
    this.sysdataService = this.ctx.service.sysdata;
  }

  /**
   * 导出聊天记录
   * GET batchact/export-chatlog
   */
  async exportChatlog() {
    const { start, end } = this.ctx.request.query;
    const start_date = moment(start, "YYYYMMDD");
    const end_date = moment(end, "YYYYMMDD");
    const dates = [];
    let cur = start_date;
    while (cur <= end_date) {
      dates.push(cur.format("YYYYMMDD"));
      cur = cur.add(1, 'days');
    }

    const chat_log_path = this.ctx.app.config.chat_log_path;
    const files = [];
    dates.map(date => {
      const file = path.join(chat_log_path, `gn.merge_chat_${date}.log`);
      try {
        fs.accessSync(file, fs.constants.R_OK);
        files.push(file);
      } catch (e) {
        // this.ctx.logger.info(e);
      }
    });

    const streams = [];
    for (const file of files) {
      streams.push(fs.createReadStream(file));
    }

    this.ctx.attachment(`${start}_${end}.txt`);
    this.ctx.set('Content-Type', 'application/octet-stream');
    this.ctx.body = new MultiStream(streams);
  }

  // 批量禁言
  async banTalk() {
    const err_guids = [];
    const { items, reason, part_id } = this.ctx.request.body;
    for (const item of items) {
      const r = await this.banService.banTalk({ guid: `${item[0]}`, time: item[1], flag: 0, reason, part_id });
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

  // 批量封号
  async banAccount() {
    const err_uids = [];
    const { items, reason, part_id } = this.ctx.request.body;
    for (const item of items) {
      const r = await this.banService.banAccount({ uid: `${item[0]}`, time: item[1], flag: 0, reason, part_id });
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
        const award = {
          [title[0]]: `${item[0]}`,
          [title[1]]: `${item[1]}`,
          [title[2]]: `${item[2]}`,
          [title[3]]: `${item[3]}`,
          [title[4]]: `${item[4]}`,
        };
        award['type'] = parseInt(award['type']);
        award['id'] = parseInt(award['id']);
        award['cnt'] = parseInt(award['cnt']);
        award['param'] = parseInt(award['param']);

        award_lists.push(award);
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
