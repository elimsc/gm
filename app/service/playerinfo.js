'use strict';

const BaseReqService = require('./basereq');

class PlayerinfoService extends BaseReqService {
  // 角色列表查询
  async list({ name, type, part_id }) {
    const result = await this.request(
      { cmd: 1001 },
      { name: name.trim(), type, part_id },
      ['name', 'type']
    );
    if (!result) return [];
    if (result.data && result.data.body && result.data.body.rolelist) {
      return result.data.body.rolelist;
    }
    return [];
  }

  // 角色基本信息查询
  async basicInfo({ guid, part_id }) {
    const result = await this.request({ cmd: 1003 }, { guid, part_id }, [
      'guid',
    ]);
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
        last_login_time: this.prettyTime,
        last_logout_time: this.prettyTime,
        create_time: this.prettyTime,
      };

      return this.ctx.helper.tableInfoConv(src, tpl, fns);
    }
    return [];
  }

  // 角色背包信息查询
  async bagInfo({ guid, part_id }) {
    const result = await this.request({ cmd: 1005 }, { guid, part_id }, [
      'guid',
    ]);
    if (!result) return [];
    if (result.data && result.data.body && result.data.body.itemlist) {
      // 处理返回结果
      const src = result.data.body.itemlist;

      const tpl = {
        id: 'ID',
        name: '名字',
        cnt: '数量',
        bind_type: '绑定类型', // 0永久不绑定/1限时绑定/2使用绑定/3永久绑定
        bind_state: '绑定状态', // 非0表示绑定
        timeout: '过期时间',
        bind_timeout: '绑定过期时间',
        index: '所在格子号',
      };
      const bind_type_map = bind_type => {
        switch (bind_type) {
          case 0:
            return '永久不绑定';
          case 1:
            return '限时绑定';
          case 2:
            return '使用绑定';
          case 3:
            return '永久绑定';
          default:
            break;
        }
      };
      const bind_state_map = bind_state => {
        switch (bind_state) {
          case 0:
            return '未绑定';
          default:
            return '绑定';
        }
      };
      const fns = {
        timeout: this.prettyTime,
        bind_timeout: this.prettyTime,
        bind_type: bind_type_map,
        bind_state: bind_state_map,
      };
      return this.ctx.helper.tableInfoListConv(src, tpl, fns);
    }
    return [];
  }

  // 角色仓库信息查询
  async wareHouseInfo({ guid, part_id }) {
    const result = await this.request({ cmd: 1007 }, { guid, part_id }, [
      'guid',
    ]);
    if (!result) return [];
    if (result.data && result.data.body && result.data.body.itemlist) {
      // 处理返回结果
      const src = result.data.body.itemlist;

      const tpl = {
        id: 'ID',
        name: '名字',
        cnt: '数量',
        bind_type: '绑定类型', // 0永久不绑定/1限时绑定/2使用绑定/3永久绑定
        bind_state: '绑定状态', // 非0表示绑定
        timeout: '过期时间',
        bind_timeout: '绑定过期时间',
        index: '所在格子号',
      };

      const bind_type_map = bind_type => {
        switch (bind_type) {
          case 0:
            return '永久不绑定';
          case 1:
            return '限时绑定';
          case 2:
            return '使用绑定';
          case 3:
            return '永久绑定';
          default:
            break;
        }
      };
      const bind_state_map = bind_state => {
        switch (bind_state) {
          case 0:
            return '未绑定';
          default:
            return '绑定';
        }
      };
      const fns = {
        timeout: this.prettyTime,
        bind_timeout: this.prettyTime,
        bind_type: bind_type_map,
        bind_state: bind_state_map,
      };
      return this.ctx.helper.tableInfoListConv(src, tpl, fns);
    }
    return [];
  }

  // 角色装备信息查询
  async equipInfo({ guid, part_id }) {
    const result = await this.request({ cmd: 1009 }, { guid, part_id }, [
      'guid',
    ]);
    if (!result) return [];
    if (result.data && result.data.body && result.data.body.equiplist) {
      const src = result.data.body.equiplist;
      const tpl = {
        id: 'ID',
        name: '名字',
        level: '等级',
        strength_level: '强化等级',
        refine_level: '精炼等级',
        gem_list: '宝石列表',
        gem_id: '宝石ID',
        gem_name: '宝石名字',
        gem_level: '宝石等级',
        spirit_list: '器灵列表',
        spirit_id: '器灵ID',
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

  // 角色饰品信息查询
  async decInfo({ guid, part_id }) {
    const result = await this.request({ cmd: 1025 }, { guid, part_id }, [
      'guid',
    ]);
    if (!result) return [];
    if (result.data && result.data.body && result.data.body.declist) {
      const src = result.data.body.declist;

      const tpl = {
        id: 'ID',
        name: '名字',
        level: '等级',
        quality: '品质',
        strength_level: '突破等级',
      };

      return this.ctx.helper.tableInfoListConv(src, tpl);
    }
    return [];
  }

  // 角色技能信息查询
  async skillInfo({ guid, part_id }) {
    const result = await this.request({ cmd: 1011 }, { guid, part_id }, [
      'guid',
    ]);
    if (!result) return [];
    if (result.data && result.data.body && result.data.body.skilllist) {
      // 处理返回结果
      const src = result.data.body.skilllist;

      const tpl = {
        id: 'ID',
        name: '名字',
        level: '等级',
      };

      return this.ctx.helper.tableInfoListConv(src, tpl);
    }
    return [];
  }

  // 角色称号信息查询
  async titleInfo({ guid, part_id }) {
    const result = await this.request({ cmd: 1013 }, { guid, part_id }, [
      'guid',
    ]);
    if (!result) return [];
    if (result.data && result.data.body && result.data.body.titlelist) {
      // 处理返回结果
      const src = result.data.body.titlelist;

      const tpl = {
        id: 'ID',
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
    const result = await this.request({ cmd: 1015 }, { guid, part_id }, [
      'guid',
    ]);
    if (!result) return [];
    if (result.data && result.data.body && result.data.body.petlist) {
      // 处理返回结果
      const src = result.data.body.petlist;

      const tpl = {
        guid: 'GUID',
        data_id: '配表id',
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
  async taskInfo({ guid, part_id }) {
    const result = await this.request({ cmd: 1017 }, { guid, part_id }, [
      'guid',
    ]);
    if (!result) return [];
    if (
      result.data &&
      result.data.body &&
      result.data.body.normal_mission_accepted_list
    ) {
      // 处理返回结果
      const src = result.data.body.normal_mission_accepted_list;
      const tpl = {
        id: '配表id',
        state: '状态', // 0无/1进行/2完成/3失败/4提交
        object: '目标值',
      };

      const stateMap = state => {
        switch (state) {
          case 0:
            return '无';
          case 1:
            return '进行';
          case 2:
            return '完成';
          case 3:
            return '失败';
          case 4:
            return '提交';
          default:
            return '无';
        }
      };
      const fns = {
        state: stateMap,
      };

      return this.ctx.helper.tableInfoListConv(src, tpl, fns);
    }
    return [];
  }

  async homeInfo({ guid, part_id }) {
    const result = await this.request({ cmd: 1019 }, { guid, part_id }, [
      'guid',
    ]);
    if (!result) return [];
    if (result.data && result.data.body) {
      // 处理返回结果
      const src = result.data.body;
      const tpl = {
        building_list: '建筑列表',
        worker_list: '工人列表',
      };
      const tpl1 = {
        id: '配表id',
        name: '建筑名称',
        level: '建筑等级',
      };
      const tpl2 = {
        name: '工人名字',
        career: '职业', // 0工匠/1宝石匠/2木匠/3郎中/4方士
        age: '年龄',
        ability: '能力值',
      };
      const careerMap = career => {
        switch (career) {
          case 0:
            return '工匠';
          case 1:
            return '宝石匠';
          case 2:
            return '木匠';
          case 3:
            return '郎中';
          case 4:
            return '方士';
          default:
            return '';
        }
      };
      const fns = {
        building_list: src => this.ctx.helper.tableInfoListConv(src, tpl1),
        worker_list: src =>
          this.ctx.helper.tableInfoListConv(src, tpl2, { career: careerMap }),
      };
      return this.ctx.helper.tableInfoConv(src, tpl, fns);
    }
    return [];
  }

  async emailInfo({ guid, part_id }) {
    const result = await this.request({ cmd: 1021 }, { guid, part_id }, [
      'guid',
    ]);
    if (!result) return [];
    if (result.data && result.data.body && result.data.body.system_mail_list) {
      // 处理返回结果
      const src = result.data.body.system_mail_list;
      const tpl = {
        mail_id: '邮件GUID',
        sender_id: '发件人ID',
        sub_type: '子类型',
        content: '内容',
        status: '状态',
        attachment_list: '附件列表',
        type: '奖励类型',
        id: '奖励ID',
        num: '奖励数量',
      };

      const statusMap = status => {
        switch (status) {
          case -1:
            return '未确认';
          case 0:
            return '未读';
          case 1:
            return '已读';
          case 2:
            return '附件已提取';
          default:
            return '';
        }
      };
      const fns = {
        status: statusMap,
        attachment_list: src => this.ctx.helper.tableInfoListConv(src, tpl),
      };

      return this.ctx.helper.tableInfoListConv(src, tpl, fns);
    }
    return [];
  }

  async marriageInfo({ guid, part_id }) {
    const result = await this.request({ cmd: 1023 }, { guid, part_id }, [
      'guid',
    ]);

    if (!result) return [];
    if (result.data && result.data.body) {
      // 处理返回结果
      const src = result.data.body;
      src.self_info = [{
        partner_guid: src.partner_guid,
        partner_start_time: src.partner_start_time,
        master_guid: src.master_guid,
        master_start_time: src.master_start_time,
        is_graduate: src.is_graduate,
        graduate_cnt: src.graduate_cnt,
      }];
      const tpl = {
        self_info: '个人社交信息',
        student_list: '正在学习的徒弟列表',
      }
      const tpl1 = {
        partner_guid: '配偶GUID',
        partner_start_time: '结婚时间',
        master_guid: '师父GUID',
        master_start_time: "拜师时间",
        is_graduate: "自己是否已出师",
        graduate_cnt: '已出师徒弟数量',
      };
      const tpl2 = {
        student_guid: '徒弟GUID',
        student_start_time: '拜师时间',
      }

      const fns = {
        self_info: src => this.ctx.helper.tableInfoListConv(src, tpl1, {
          partner_start_time: this.prettyTime,
          master_start_time: this.prettyTime,
          is_graduate: v => {
            if (v === true || v === false) return v === true ? '是' : '否';
            return v;
          }
        }),
        student_list: src =>
          this.ctx.helper.tableInfoListConv(src, tpl2, { student_start_time: this.prettyTime }),
      };
      return this.ctx.helper.tableInfoConv(src, tpl, fns);
    }
    return [];
  }
}

module.exports = PlayerinfoService;
