'use strict';

const Service = require('egg').Service;

/**
 * GM操作日志
 */
class ActlogService extends Service {
  async list({ pageSize, page, subject, channel_id }) {
    const condition = {};
    if (subject) {
      condition.subject = subject;
    }
    if (channel_id && channel_id !== -1) {
      condition.channel_id = channel_id;
    }

    const logs = await this.app.mysql.select('actlog', {
      where: condition,
      columns: ['subject', 'object', 'part_id', 'channel_id', 'action', 'data', 'created_at'],
      orders: [['id', 'desc']],
      limit: pageSize,
      offset: pageSize * (page - 1),
    });
    return logs;
  }

  async count({ subject, channel_id }) {
    const condition = {};
    if (subject) {
      condition.subject = subject;
    }
    if (channel_id && channel_id !== -1) {
      condition.channel_id = channel_id;
    }
    const count = await this.app.mysql.count('actlog', condition);
    return count;
  }

  async create({ subject, object, action, part_id, data, channel_id }) {
    try {
      const result = await this.app.mysql.insert('actlog', { subject, object, action, part_id, data, channel_id });
      return result.affectedRows === 1;
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }

  async delete(id) {
    try {
      const result = await this.app.mysql.delete('actlog', { id });
      return result.affectedRows === 1;
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }
}

module.exports = ActlogService;
