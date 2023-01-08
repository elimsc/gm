'use strict';

const DBGMService = require('./dbgm')

/**
 * ProjectA 公告service
 */
class ProjectAAnnService extends DBGMService {
  async createAnnType({identity, name}) {
    try {
      const result = await this.db.insert('projecta_ann_type', {identity, name});
      return result.affectedRows === 1;
    } catch (e) {
      return false;
    }
  }

  async listAnnType() {
    const annTypes = await this.db.select('projecta_ann_type', {
      orders: [['id', 'desc']],
    });
    return annTypes;
  }

  async updateAnnType({id, identity, name}) {
    try {
      const result = await this.db.update('projecta_ann_type', {id, identity, name});
      return result.affectedRows === 1;
    } catch (e) {
      return false;
    }
  }

  async deleteAnnType({id}) {
    try {
      const result = await this.db.delete('projecta_ann_type', { id });
      return result.affectedRows === 1;
    } catch (e) {
      return false;
    }
  }

  async createAnn({pic, title, order, label, content, type, start_time, end_time}) {
    try {
      const result = await this.db.insert('projecta_ann', {label, pic, title, order, content, type, start_time, end_time});
      return result.affectedRows === 1;
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }

  async listAnn({type, id}) {
    const where = {}
    if (type) {
      where['type'] = type
    }
    if (id) {
      where['id'] = id
    }
    const anns = await this.db.select('projecta_ann', {
      where,
      orders: [['id', 'desc']],
    });
    return anns;
  }

  async updateAnn({id, pic, title, order, label, content, type, start_time, end_time}) {
    try {
      const result = await this.db.update('projecta_ann', {id, order, label, pic, title, content, type, start_time, end_time});
      return result.affectedRows === 1;
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }

  async deleteAnn({id}) {
    try {
      const result = await this.db.delete('projecta_ann', { id });
      return result.affectedRows === 1;
    } catch (e) {
      return false;
    }
  }

  async createAnnSubcontent({ann_id, title, order, content, start_time, end_time}) {
    try {
      const result = await this.db.insert('projecta_ann_subcontent', {ann_id, title, order, content, start_time, end_time});
      return result.affectedRows === 1;
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }

  async listAnnSubcontent({ann_id, id}) {
    const where = {}
    if (ann_id) {
      where['ann_id'] = ann_id
    }
    if (id) {
      where['id'] = id
    }
    const anns = await this.db.select('projecta_ann_subcontent', {
      where,
      orders: [['id', 'desc']],
    });
    return anns;
  }

  async updateAnnSubcontent({id, ann_id, title, order, content, start_time, end_time}) {
    try {
      const result = await this.db.update('projecta_ann_subcontent', {id, ann_id, title, order, content, start_time, end_time});
      return result.affectedRows === 1;
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }

  async deleteAnnSubcontent({id}) {
    try {
      const result = await this.db.delete('projecta_ann_subcontent', { id });
      return result.affectedRows === 1;
    } catch (e) {
      return false;
    }
  }
}

module.exports = ProjectAAnnService;
