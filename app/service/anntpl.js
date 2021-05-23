'use strict';

const DBGMService = require('./dbgm')

/**
 * 公告模板相关的service
 */
class AnntplService extends DBGMService {
  async list() {
    const tpls = await this.db.select('anntpl');
    return tpls;
  }

  async create({ content }) {
    try {
      const result = await this.db.insert('anntpl', { content });
      return result.affectedRows === 1;
    } catch (e) {
      return false;
    }
  }

  async delete({ id }) {
    try {
      const result = await this.db.delete('anntpl', { id });
      return result.affectedRows === 1;
    } catch (e) {
      return false;
    }
  }
}

module.exports = AnntplService;
