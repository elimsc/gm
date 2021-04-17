'use strict';

const Service = require('egg').Service;

/**
 * 公告模板相关的service
 */
class AnntplService extends Service {
  async list() {
    const tpls = await this.app.mysql.select('anntpl');
    return tpls;
  }

  async create({ content }) {
    try {
      const result = await this.app.mysql.insert('anntpl', { content });
      return result.affectedRows === 1;
    } catch (e) {
      return false;
    }
  }

  async delete({ id }) {
    try {
      const result = await this.app.mysql.delete('anntpl', { id });
      return result.affectedRows === 1;
    } catch (e) {
      return false;
    }
  }
}

module.exports = AnntplService;
