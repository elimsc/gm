'use strict';

const DBGMService = require('./dbgm')

/**
 * ip黑名单
 */
class IpBlackListService extends DBGMService {
  async list() {
    const blackList = await this.db.select('t_ip_black_list');
    return blackList;
  }

  async create({rows}) {
    try {
      const result = await this.db.insert('t_ip_black_list', rows);
      return result.affectedRows === rows.length;
    } catch (e) {
      return false;
    }
  }

  async delete({ id }) {
    try {
      const result = await this.db.delete('t_ip_black_list', { id });
      return result.affectedRows === 1;
    } catch (e) {
      return false;
    }
  }
}

module.exports = IpBlackListService;
