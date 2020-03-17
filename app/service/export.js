'use strict';

const BaseReqService = require('./basereq');


class ExportService extends BaseReqService {
  /**
   * 黑名单导出
   */
  async blacklist({ part_id }) {
    const r = await this.request({ cmd: 3043 }, { part_id }, []);
    try {
      return r.data.body.blacklist;
    } catch (e) {
      return [];
    }
  }
}

module.exports = ExportService;