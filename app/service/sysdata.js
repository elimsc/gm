'use strict';

const DBGMService = require('./dbgm');

/**
 * 系统数据相关service
 */
class SysdataService extends DBGMService {

  // 根据道具名获取可选名
  async listPropByName(name) {
    if (!name) return [];
    let results;

    try {
      if (name === '*') {
        results = await this.db.query('select * from prop');
      } else {
        results = await this.db.query(`select * from prop where name like "${name}%" limit 20`);
      }
    } catch (e) {
      results = [];
    }

    return results;
  }
}

module.exports = SysdataService;
