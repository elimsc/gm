'use strict';

const Service = require('egg').Service;

/**
 * 系统数据相关service
 */
class SysdataService extends Service {

  // 根据道具名获取可选名
  async listPropByName(name) {
    if (!name) return [];
    let results;

    try {
      if (name === '*') {
        results = await this.app.mysql.query('select * from prop limit 20');
      }
      results = await this.app.mysql.query(`select * from prop where name like "${name}%" limit 20`);
    } catch (e) {
      results = [];
    }

    return results;
  }
}

module.exports = SysdataService;
