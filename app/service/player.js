'use strict';

const BaseReqService = require('./basereq');

const URL = 'demoh';

class PlayerService extends BaseReqService {
  // 角色列表查询
  async list({ name, type }) {
    // const result = await this.request(URL, { cmd: 1001 }, { name, type }, [ 'name', 'type' ]);
    const result = [
      {
        name: '小小号1',
        sex: '男',
        menpai: '正剑门',
        level: '50',
        guid: '123131231423434531',
      },
      {
        name: '小小号2',
        sex: '男',
        menpai: '正剑门',
        level: '50',
        guid: '123131231423434532',
      },
      {
        name: '小小号3',
        sex: '男',
        menpai: '正剑门',
        level: '50',
        guid: '123131231423434533',
      },
      {
        name: '小小号3',
        sex: '男',
        menpai: '正剑门',
        level: '50',
        guid: '123131231423434534',
      },
      {
        name: '小小号3',
        sex: '男',
        menpai: '正剑门',
        level: '50',
        guid: '123131231423434535',
      },
      {
        name: '小小号3',
        sex: '男',
        menpai: '正剑门',
        level: '50',
        guid: '123131231423434536',
      },
      {
        name: '小小号3',
        sex: '男',
        menpai: '正剑门',
        level: '50',
        guid: '123131231423434537',
      },
      {
        name: '小小号3',
        sex: '男',
        menpai: '正剑门',
        level: '50',
        guid: '123131231423434538',
      },
    ];
    return result;
    // return genBody({ cmd: 1001 }, { name, type }, [ 'name', 'type' ]);
  }

  // 角色基本信息查询
  async basicInfo({ guid }) {
    const result = [
      { title: 'HP', value: '123123123132' },
      { title: 'H1P', value: '123123123132' },
      { title: 'HP2', value: '123123123132' },
      { title: 'HP4', value: '123123123132' },
      { title: 'HP5', value: '123123123132' },
      { title: 'HP6', value: '123123123132' },
      { title: 'HP7', value: '123123123132' },
      { title: 'HP8', value: '123123123132' },
      { title: '攻击', value: '21' },
      { title: '物防', value: '0' },
      { title: 'H2P', value: '123123123132' },
      { title: 'H3P', value: '123123123132' },
      { title: 'H4P', value: '123123123132' },
    ];
    return result;
  }

  // 角色背包信息查询
  async bagInfo({ guid }) {
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
  async equipInfo({ guid }) {
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
  async skillInfo({ guid }) {
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
  async titleInfo({ guid }) {
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
}

module.exports = PlayerService;
