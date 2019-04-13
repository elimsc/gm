'use strict';

const BaseReqService = require('./basereq');

const URL = 'demoh';

class PlayerService extends BaseReqService {
  // 角色列表查询
  async list({ name, type }) {
    const result = await this.request(URL, { cmd: 1001 }, { name, type }, [ 'name', 'type' ]);
    return result;
    // return genBody({ cmd: 1001 }, { name, type }, [ 'name', 'type' ]);
  }

  // 角色基本信息查询
  async basic_info({ guid }) {
    const result = await this.request(URL, { cmd: 1003 }, { guid }, [ 'guid' ]);
    return result;
  }

  // 角色背包信息查询
  async bag_info({ guid }) {
    const result = await this.request(URL, { cmd: 1005 }, { guid }, [ 'guid' ]);
    return result;
  }

  // 角色仓库信息查询
  async warehouse_info({ guid }) {
    const result = await this.request(URL, { cmd: 1007 }, { guid }, [ 'guid' ]);
    return result;
  }

  // 角色装备信息查询
  async equip_info({ guid }) {
    const result = await this.request(URL, { cmd: 1009 }, { guid }, [ 'guid' ]);
    return result;
  }

  // 角色技能信息查询
  async skill_info({ guid }) {
    const result = await this.request(URL, { cmd: 1011 }, { guid }, [ 'guid' ]);
    return result;
  }

  // 角色称号信息查询
  async title_info({ guid }) {
    const result = await this.request(URL, { cmd: 1013 }, { guid }, [ 'guid' ]);
    return result;
  }
}

module.exports = PlayerService;
