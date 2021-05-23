'use strict';

const DBGMService = require('./dbgm')

/**
 * GM操作日志
 */
class ActlogService extends DBGMService {
  async list({ pageSize, page, subject, channel_id, startTime, endTime }) {

    let wheresql = '';
    const whereVals = [];
    if (subject) {
      wheresql += "AND subject = ? "
      whereVals.push(subject);
    }
    if (channel_id && channel_id !== -1) {
      wheresql += "AND channel_id = ? ";
      whereVals.push(channel_id);
    }
    if (startTime && endTime) {
      wheresql += "AND created_at >= ? AND created_at <= ? ";
      whereVals.push(startTime);
      whereVals.push(endTime);
    }

    const sql = `
    SELECT id,subject,object,part_id,channel_id,action,data,created_at
    FROM actlog
    WHERE 1=1 ${wheresql}
    ORDER BY id desc
    LIMIT ${pageSize}
    OFFSET ${pageSize * (page - 1)}
    `;
    // console.log(sql);
    const logs = await this.db.query(sql, whereVals);

    // const logs = await this.db.select('actlog', {
    //   where: condition,
    //   columns: ['subject', 'object', 'part_id', 'channel_id', 'action', 'data', 'created_at', 'id'],
    //   orders: [['id', 'desc']],
    //   limit: pageSize,
    //   offset: pageSize * (page - 1),
    // });
    return logs;
  }

  async count({ subject, channel_id, startTime, endTime }) {
    let wheresql = '';
    const whereVals = [];
    if (subject) {
      wheresql += "AND subject = ? "
      whereVals.push(subject);
    }
    if (channel_id && channel_id !== -1) {
      wheresql += "AND channel_id = ? ";
      whereVals.push(channel_id);
    }
    if (startTime && endTime) {
      wheresql += "AND created_at >= ? AND created_at <= ? ";
      whereVals.push(startTime);
      whereVals.push(endTime);
    }

    const sql = `
    SELECT count(*) as count
    FROM actlog
    WHERE 1=1 ${wheresql}
    `;
    const count = await this.db.query(sql, whereVals);
    // console.log(count[0].count)
    return count[0].count;
  }

  async create({ subject, object, action, part_id, data, channel_id }) {
    try {
      const result = await this.db.insert('actlog', { subject, object, action, part_id, data, channel_id });
      return result.affectedRows === 1;
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }

  async delete(id) {
    try {
      const result = await this.db.delete('actlog', { id });
      return result.affectedRows === 1;
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }
}

module.exports = ActlogService;
