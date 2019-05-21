'use strict';

const Service = require('egg').Service;

/**
 * 系统数据相关service
 */
class SysdataService extends Service {

  // 根据道具名获取可选名
  async listPropByName(name) {
    if (!name) return [];
    if (name === '*') {
      const results = await this.app.mysql.query('select * from prop');
      return results;
    }
    const results = await this.app.mysql.query(`select * from prop where name like '${name}%'`);
    return results;
  }
}

module.exports = SysdataService;
