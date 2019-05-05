'use strict';

const BaseReqService = require('./basereq');
const moment = require('moment');

class PlayerinfoService extends BaseReqService {
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

      const pretttyTime = t => {
        return moment(t).format('YYYY-MM-DD HH:mm:ss');
      };
      const fns = {
        last_login_time: pretttyTime,
        last_logout_time: pretttyTime,
        create_time: pretttyTime,
      };

      return this.ctx.helper.tableInfoConv(src, tpl, fns);
    }
    return [];
  }

  // 角色背包信息查询
  async bagInfo({ guid, part_id }) {
    const result = [
      [
        { title: '道具名称', value: '道具1' },
        { title: '数量', value: 2 },
        { title: '绑定状态', value: '绑定' },
        { title: '使用时限', value: 0 },
        { title: '创建时间', value: '2018.1.2' },
      ],
      [
        { title: '道具名称', value: '道具2' },
        { title: '数量', value: 2 },
        { title: '绑定状态', value: '绑定' },
        { title: '使用时限', value: 0 },
        { title: '创建时间', value: '2018.1.2' },
      ],
      [
        { title: '道具名称', value: '道具3' },
        { title: '数量', value: 2 },
        { title: '绑定状态', value: '绑定' },
        { title: '使用时限', value: 0 },
        { title: '创建时间', value: '2018.1.2' },
      ],
      [
        { title: '道具名称', value: '道具4' },
        { title: '数量', value: 2 },
        { title: '绑定状态', value: '绑定' },
        { title: '使用时限', value: 0 },
        { title: '创建时间', value: '2018.1.2' },
      ],
      [
        { title: '道具名称', value: '道具5' },
        { title: '数量', value: 2 },
        { title: '绑定状态', value: '绑定' },
        { title: '使用时限', value: 0 },
        { title: '创建时间', value: '2018.1.2' },
      ],
      [
        { title: '道具名称', value: '道具6' },
        { title: '数量', value: 2 },
        { title: '绑定状态', value: '绑定' },
        { title: '使用时限', value: 0 },
        { title: '创建时间', value: '2018.1.2' },
      ],
      [
        { title: '道具名称', value: '道具6' },
        { title: '数量', value: 2 },
        { title: '绑定状态', value: '绑定' },
        { title: '使用时限', value: 0 },
        { title: '创建时间', value: '2018.1.2' },
      ],
    ];
    return result;
  }

  // 角色仓库信息查询
  async wareHouseInfo({ guid }) {
    const result = [
      [
        { title: '道具名称', value: '仓库道具1' },
        { title: '数量', value: 2 },
        { title: '绑定状态', value: '绑定' },
        { title: '使用时限', value: 0 },
        { title: '创建时间', value: '2018.1.2' },
      ],
      [
        { title: '道具名称', value: '仓库道具2' },
        { title: '数量', value: 2 },
        { title: '绑定状态', value: '绑定' },
        { title: '使用时限', value: 0 },
        { title: '创建时间', value: '2018.1.2' },
      ],
      [
        { title: '道具名称', value: '仓库道具3' },
        { title: '数量', value: 2 },
        { title: '绑定状态', value: '绑定' },
        { title: '使用时限', value: 0 },
        { title: '创建时间', value: '2018.1.2' },
      ],
      [
        { title: '道具名称', value: '仓库道具4' },
        { title: '数量', value: 2 },
        { title: '绑定状态', value: '绑定' },
        { title: '使用时限', value: 0 },
        { title: '创建时间', value: '2018.1.2' },
      ],
      [
        { title: '道具名称', value: '仓库道具5' },
        { title: '数量', value: 2 },
        { title: '绑定状态', value: '绑定' },
        { title: '使用时限', value: 0 },
        { title: '创建时间', value: '2018.1.2' },
      ],
    ];

    return result;
  }

  // 角色装备信息查询
  async equipInfo({ guid, part_id }) {
    const result = [
      [
        { title: '装备名称', value: '装备1' },
        { title: '强化等级', value: 2 },
        { title: '精炼等级', value: 4 },
        { title: '宝石等级', value: 3 },
        { title: '器灵等级', value: 5 },
        { title: '铭文等级', value: 10 },
      ],
      [
        { title: '装备名称', value: '装备2' },
        { title: '强化等级', value: 2 },
        { title: '精炼等级', value: 4 },
        { title: '宝石等级', value: 3 },
        { title: '器灵等级', value: 5 },
        { title: '铭文等级', value: 10 },
      ], [
        { title: '装备名称', value: '装备3' },
        { title: '强化等级', value: 2 },
        { title: '精炼等级', value: 4 },
        { title: '宝石等级', value: 3 },
        { title: '器灵等级', value: 5 },
        { title: '铭文等级', value: 10 },
      ], [
        { title: '装备名称', value: '装备4' },
        { title: '强化等级', value: 2 },
        { title: '精炼等级', value: 4 },
        { title: '宝石等级', value: 3 },
        { title: '器灵等级', value: 5 },
        { title: '铭文等级', value: 10 },
      ], [
        { title: '装备名称', value: '装备5' },
        { title: '强化等级', value: 2 },
        { title: '精炼等级', value: 4 },
        { title: '宝石等级', value: 3 },
        { title: '器灵等级', value: 5 },
        { title: '铭文等级', value: 10 },
      ],
      [
        { title: '装备名称', value: '装备6' },
        { title: '强化等级', value: 2 },
        { title: '精炼等级', value: 4 },
        { title: '宝石等级', value: 3 },
        { title: '器灵等级', value: 5 },
        { title: '铭文等级', value: 10 },
      ],
    ];

    return result;
  }

  // 角色技能信息查询
  async skillInfo({ guid, part_id }) {
    const result = [
      [
        { title: '技能名称', value: '技能1' },
        { title: '技能等级', value: 2 },
      ],
      [
        { title: '技能名称', value: '技能2' },
        { title: '技能等级', value: 2 },
      ],
      [
        { title: '技能名称', value: '技能3' },
        { title: '技能等级', value: 2 },
      ],
      [
        { title: '技能名称', value: '技能4' },
        { title: '技能等级', value: 2 },
      ],
      [
        { title: '技能名称', value: '技能5' },
        { title: '技能等级', value: 2 },
      ],
      [
        { title: '技能名称', value: '技能6' },
        { title: '技能等级', value: 2 },
      ],
      [
        { title: '技能名称', value: '技能7' },
        { title: '技能等级', value: 2 },
      ],

    ];
    return result;
  }

  // 角色称号信息查询
  async titleInfo({ guid, part_id }) {
    const result = [
      [
        { title: '称号名称', value: '称号11111111111' },
        { title: '称号时限', value: 0 },
        { title: '称号创建时间', value: '2014.1.1' },
      ],
      [
        { title: '称号名称', value: '称号1111123111111' },
        { title: '称号时限', value: 0 },
        { title: '称号创建时间', value: '2014.1.1' },
      ],
      [
        { title: '称号名称', value: '称号111241111111' },
        { title: '称号时限', value: 0 },
        { title: '称号创建时间', value: '2014.1.1' },
      ],
      [
        { title: '称号名称', value: '称号111154235111111' },
        { title: '称号时限', value: 0 },
        { title: '称号创建时间', value: '2014.1.1' },
      ],
      [
        { title: '称号名称', value: '称号111111123511' },
        { title: '称号时限', value: 0 },
        { title: '称号创建时间', value: '2014.1.1' },
      ],
      [
        { title: '称号名称', value: '称号11154611111' },
        { title: '称号时限', value: 0 },
        { title: '称号创建时间', value: '2014.1.1' },
      ],

    ];
    return result;
  }

  // 角色宠物信息
  async petInfo() {
    const data = [
      [
        { title: '宠物名称', value: '宠物1' },
        { title: '等级', value: 10 },
        { title: 'GUID', value: 1231312312312312 },
        { title: '亲密度', value: 10 },
        { title: '悟性', value: 100 },
        { title: '经验', value: 1231233534534 },
        { title: '当前HP', value: 10000 },
        { title: '攻击', value: 40 },
        { title: '封印', value: 10 },
        { title: 'MP', value: 10 },
        { title: '敏捷', value: 90 },
        { title: '速度', value: 12313 },
        { title: '等级', value: 10 },
        { title: 'GUID', value: 1231312312312312 },
        { title: '亲密度', value: 10 },
        { title: '悟性', value: 100 },
        { title: '经验', value: 1231233534534 },
        { title: '当前HP', value: 10000 },
        { title: '攻击', value: 40 },
        { title: '封印', value: 10 },
        { title: 'MP', value: 10 },
        { title: '敏捷', value: 90 },
        { title: '速度', value: 12313 },
      ],
      [
        { title: '宠物名称', value: '宠物2' },
        { title: '等级', value: 10 },
        { title: 'GUID', value: 1231312312312312 },
        { title: '亲密度', value: 10 },
        { title: '悟性', value: 100 },
        { title: '经验', value: 1231233534534 },
        { title: '当前HP', value: 10000 },
        { title: '攻击', value: 40 },
        { title: '封印', value: 10 },
        { title: 'MP', value: 10 },
        { title: '敏捷', value: 90 },
        { title: '速度', value: 12313 },
        { title: '等级', value: 10 },
        { title: 'GUID', value: 1231312312312312 },
        { title: '亲密度', value: 10 },
        { title: '悟性', value: 100 },
        { title: '经验', value: 1231233534534 },
        { title: '当前HP', value: 10000 },
        { title: '攻击', value: 40 },
        { title: '封印', value: 10 },
        { title: 'MP', value: 10 },
        { title: '敏捷', value: 90 },
        { title: '速度', value: 12313 },
      ],
      [
        { title: '宠物名称', value: '宠物3' },
        { title: '等级', value: 10 },
        { title: 'GUID', value: 1231312312312312 },
        { title: '亲密度', value: 10 },
        { title: '悟性', value: 100 },
        { title: '经验', value: 1231233534534 },
        { title: '当前HP', value: 10000 },
        { title: '攻击', value: 40 },
        { title: '封印', value: 10 },
        { title: 'MP', value: 10 },
        { title: '敏捷', value: 90 },
        { title: '速度', value: 12313 },
        { title: '等级', value: 10 },
        { title: 'GUID', value: 1231312312312312 },
        { title: '亲密度', value: 10 },
        { title: '悟性', value: 100 },
        { title: '经验', value: 1231233534534 },
        { title: '当前HP', value: 10000 },
        { title: '攻击', value: 40 },
        { title: '封印', value: 10 },
        { title: 'MP', value: 10 },
        { title: '敏捷', value: 90 },
        { title: '速度', value: 12313 },
      ],

    ];
    return data;
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
