'use strict';

const DBSdkCommonService = require('./dbsdk')

/**
 * 举报信息查询
 */
class JubaoService extends DBSdkCommonService {
  async listGroupByTargetGuid() {
    // SELECT target_guid, part_id, COUNT("*") as count FROM t_jubao_info GROUP BY target_guid, part_id;
    const sql = `
    SELECT target_guid, part_id, COUNT("*") as count 
    FROM t_jubao_info 
    GROUP BY target_guid, part_id`;
    const list = await this.db.query(sql);
    return list
  }

  async detailByTargetGuid(guid) {
    // SELECT id,informant_guid,type,content FROM t_jubao_info WHERE target_guid = '3333' ORDER BY id DESC;
    const sql = `
    SELECT id,informant_guid,type,content 
    FROM t_jubao_info 
    WHERE target_guid = ? 
    ORDER BY id DESC;
    `;
    const detailList = await this.db.query(sql, [guid]);
    return detailList;
  }

  async deleteByTargetGuid(guid) {
    const r = await this.db.delete('t_jubao_info', { target_guid: guid })
    return r
  }
}

module.exports = JubaoService;
