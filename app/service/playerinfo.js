'use strict';

const BaseReqService = require('./basereq');
const moment = require('moment');

class PlayerinfoService extends BaseReqService {
  // 时间输出函数
  pretttyTime(t) {
    return moment(t).format('YYYY-MM-DD HH:mm:ss');
  }
  // 角色列表查询
  async list({ name, type, part_id }) {
    const result = await this.request({ cmd: 1001 }, { name, type, part_id }, [ 'name', 'type' ]);
    if (!result) { // 异常发生
      return [{
        gender: 1,
        guid: '1828468287530731054',
        level: 70,
        menpai: 2,
        name: '俞天荷',
      }];
    }
    if (result.data && result.data.body && result.data.body.rolelist) {
      return result.data.body.rolelist;
    }
    return [];
  }

  // 角色基本信息查询
  async basicInfo({ guid, part_id }) {
    const result = await this.request({ cmd: 1003 }, { guid, part_id }, [ 'guid' ]);
    if (!result) return [];
    if (result.data && result.data.body) {
      // 处理返回结果
      const src = result.data.body;

      const tpl = {
        mt_leader_value: '队长值',
        mt_heroic_value: '侠义值',
        mt_love: '恩爱值',
        mt_xianyuan: '仙缘',
        mt_bind_xianyuan: '绑定仙缘',
        mt_yinliang: '银两',
        mt_dianquan: '点券',
        mt_banggong: '帮贡',
        mt_menpaiweiwang: '门派威望',
        last_login_time: '最后一次登录时间',
        last_logout_time: '最后一次登出时间',
        create_time: '角色创建时间',
        scene_id: '角色所在场景',
      };

      const fns = {
        last_login_time: this.pretttyTime,
        last_logout_time: this.pretttyTime,
        create_time: this.pretttyTime,
      };

      return this.ctx.helper.tableInfoConv(src, tpl, fns);
    }
    return [];
  }

  // 角色背包信息查询
  async bagInfo({ guid, part_id }) {
    const result = await this.request({ cmd: 1005 }, { guid, part_id }, [ 'guid' ]);
    if (!result) return [];
    if (result.data && result.data.body && result.data.body.itemlist) {
      // 处理返回结果
      const src = result.data.body.itemlist;

      const tpl = {
        // id: 'ID',
        name: '名字',
        cnt: '数量',
        bind_type: '绑定类型', // 0永久不绑定/1限时绑定/2使用绑定/3永久绑定
        bind_state: '绑定状态', // 非0表示绑定
        timeout: '过期时间',
        bind_timeout: '绑定过期时间',
      };
      const bind_type_map = bind_type => {
        switch (bind_type) {
          case 0: return '永久不绑定';
          case 1: return '限时绑定';
          case 2: return '使用绑定';
          case 3: return '永久绑定';
          default: break;
        }
      };
      const bind_state_map = bind_state => {
        switch (bind_state) {
          case 0: return '未绑定';
          default: return '绑定';
        }
      };
      const fns = {
        timeout: this.pretttyTime,
        bind_timeout: this.pretttyTime,
        bind_type: bind_type_map,
        bind_state: bind_state_map,
      };
      return this.ctx.helper.tableInfoListConv(src, tpl, fns);
    }
    return [];
  }

  // 角色仓库信息查询
  async wareHouseInfo({ guid, part_id }) {
    const result = await this.request({ cmd: 1007 }, { guid, part_id }, [ 'guid' ]);
    if (!result) return [];
    if (result.data && result.data.body && result.data.body.itemlist) {
      // 处理返回结果
      const src = result.data.body.itemlist;

      const tpl = {
        // id: 'ID',
        name: '名字',
        cnt: '数量',
        bind_type: '绑定类型', // 0永久不绑定/1限时绑定/2使用绑定/3永久绑定
        bind_state: '绑定状态', // 非0表示绑定
        timeout: '过期时间',
        bind_timeout: '绑定过期时间',
      };

      const bind_type_map = bind_type => {
        switch (bind_type) {
          case 0: return '永久不绑定';
          case 1: return '限时绑定';
          case 2: return '使用绑定';
          case 3: return '永久绑定';
          default: break;
        }
      };
      const bind_state_map = bind_state => {
        switch (bind_state) {
          case 0: return '未绑定';
          default: return '绑定';
        }
      };
      const fns = {
        timeout: this.pretttyTime,
        bind_timeout: this.pretttyTime,
        bind_type: bind_type_map,
        bind_state: bind_state_map,
      };
      return this.ctx.helper.tableInfoListConv(src, tpl, fns);
    }
    return [];
  }

  // 角色装备信息查询
  async equipInfo({ guid, part_id }) {
    const result = await this.request({ cmd: 1009 }, { guid, part_id }, [ 'guid' ]);
    if (!result) return [];
    if (result.data && result.data.body && result.data.body.equiplist) {
      const src = result.data.body.equiplist;
      console.log(src);
      const tpl = {
        // id: 'ID',
        name: '名字',
        level: '等级',
        strength_level: '强化等级',
        refine_level: '精炼等级',
        gem_list: '宝石列表',
        // gem_id: '宝石ID',
        gem_name: '宝石名字',
        gem_level: '宝石等级',
        spirit_list: '器灵列表',
        // spirit_id: '器灵ID',
        spirit_name: '器灵名字',
        spirit_level: '器灵等级',
        spirit_evolution_level: '器灵进化等级',
      };

      const fns = {
        gem_list: src => this.ctx.helper.tableInfoListConv(src, tpl),
        spirit_list: src => this.ctx.helper.tableInfoListConv(src, tpl),
      };
      return this.ctx.helper.tableInfoListConv(src, tpl, fns);
    }
    return [];

  }

  // 角色技能信息查询
  async skillInfo({ guid, part_id }) {
    const result = await this.request({ cmd: 1011 }, { guid, part_id }, [ 'guid' ]);
    if (!result) return [];
    if (result.data && result.data.body && result.data.body.skilllist) {
      // 处理返回结果
      const src = result.data.body.skilllist;

      const tpl = {
        // id: 'ID',
        name: '名字',
        level: '等级',
      };

      return this.ctx.helper.tableInfoListConv(src, tpl);
    }
    return [];
  }

  // 角色称号信息查询
  async titleInfo({ guid, part_id }) {
    const result = await this.request({ cmd: 1013 }, { guid, part_id }, [ 'guid' ]);
    if (!result) return [];
    if (result.data && result.data.body && result.data.body.titlelist) {
      // 处理返回结果
      const src = result.data.body.titlelist;

      const tpl = {
        // id: 'ID',
        name: '名字',
        create_time: '创建时间',
        timeout: '时限',
      };

      return this.ctx.helper.tableInfoListConv(src, tpl);
    }
    return [];
  }

  // 角色宠物信息
  async petInfo({ guid, part_id }) {
    const result = await this.request({ cmd: 1015 }, { guid, part_id }, [ 'guid' ]);
    if (!result) return [];
    if (result.data && result.data.body && result.data.body.petlist) {
      // 处理返回结果
      const src = result.data.body.petlist;

      const tpl = {
        guid: 'GUID',
        // data_id: '配表id',
        name: '名字',
        intercommunion: '亲密度',
        bind_state: '绑定状态',
        level: '等级',
        exp: '经验',
        hp: '生命',
        mp: '魔法',
        wuxing: '悟性',
        zizhi_hp: '气血资质',
        zizhi_atk: '攻击资质',
        zizhi_pdef: '物防资质',
        zizhi_mdef: '法防资质',
        zizhi_speed: '速度资质',
        zizhi_agi: '敏捷资质',
      };

      return this.ctx.helper.tableInfoListConv(src, tpl);
    }
    return [];
  }

  // 角色任务信息
  async taskInfo() {
    const data = [
      [
        { title: '任务id', value: '1233243450984305' },
        { title: '状态 ', value: '已接取' },
      ],
      [
        { title: '任务id', value: '1233243450984306' },
        { title: '状态 ', value: '未接取' },
      ],
      [
        { title: '任务id', value: '1233243450984305' },
        { title: '状态 ', value: '已接取' },
      ],
      [
        { title: '任务id', value: '1233243450984306' },
        { title: '状态 ', value: '未接取' },
      ],
      [
        { title: '任务id', value: '1233243450984305' },
        { title: '状态 ', value: '已接取' },
      ],
      [
        { title: '任务id', value: '1233243450984306' },
        { title: '状态 ', value: '未接取' },
      ],
      [
        { title: '任务id', value: '1233243450984305' },
        { title: '状态 ', value: '已接取' },
      ],
      [
        { title: '任务id', value: '1233243450984306' },
        { title: '状态 ', value: '未接取' },
      ],
      [
        { title: '任务id', value: '1233243450984305' },
        { title: '状态 ', value: '已接取' },
      ],
      [
        { title: '任务id', value: '1233243450984306' },
        { title: '状态 ', value: '未接取' },
      ],

    ];
    return data;
  }

  async homeInfo({ guid, part_id }) {
    return [];
  }

  async emailInfo({ guid, part_id }) {
    return [];
  }

  async marriageInfo({ guid, part_id }) {
    return [];
  }
}

module.exports = PlayerinfoService;
