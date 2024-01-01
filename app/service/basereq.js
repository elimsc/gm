'use strict';

const Service = require('egg').Service;
const moment = require('moment');

function mockData(body) {
  return {
    data: body
  }
}

var cmdMockResp = {

  3001: mockData({
    "body" : {
      "partlist" :           //分区列表 
      [
          {
              "part_id" : 1,             //区号
              "part_name" : "区1",        //区名
          },
          {
            "part_id" : 2,             //区号
            "part_name" : "区2",        //区名
        }
      ],
      "itemlist" :           //物品列表 
      [
          {
              "item_id" : 1,            //物品ID 
              "item_name" : "物品1",        //物品名
          },
          {
            "item_id" : 2,            //物品ID 
            "item_name" : "物品2",        //物品名
        }
      ],
      "herolist" :           //英雄列表 
      [
          {
              "hero_id" : 1,            //英雄ID 
              "hero_name" : "英雄1",        //英雄名
          },
          {
            "hero_id" : 2,            //英雄ID 
            "hero_name" : "英雄2",        //英雄名
        }
      ],
      "headlist" :           //头像列表 
      [
          {
              "head_id" : 1,            //头像ID 
              "head_name" : "头像1",        //头像名
          },
          {
            "head_id" : 2,            //头像ID 
            "head_name" : "头像2",        //头像名
        }
      ],
      "headframelist" :           //头像框列表 
      [
          {
              "frame_id" : 1,            //头像框ID 
              "frame_name" : "头像框1",        //头像框名
          },
          {
            "frame_id" : 2,            //头像框ID 
            "frame_name" : "头像框2",        //头像框名
        }
      ],
      "backgroudlist" :           //名片列表 
      [
          {
              "backgroud_id" : 1,            //名片ID 
              "backgroud_name" : "名片1",        //名片名
          },
          {
            "backgroud_id" : 2,            //名片ID 
            "backgroud_name" : "名片2",        //名片名
        }
      ],
      "rechargelist" :           //充值列表 
      [
          {
              "recharge_id" : 1,            //充值ID 
              "recharge_name" : "充值1",        //充值名
          },
          {
            "recharge_id" : 2,            //充值ID 
            "recharge_name" : "充值2",        //充值名
        }
      ],
  }
  }),

  1001: mockData({
    "body" : {
      "rolelist" :           //角色信息列表 
      [
          {
              "name" : "mock",        //角色名
              "gender" : 0,        //性别,0男/1女
              "menpai" : -1,        //-1,无门派
              "level" : 1,         //等级
              "guid" : "1111",             //角色GUID
              "uid" : 1,            //账号UID
              "part_name" : "-1",        //所在服务器名称
              "mobile" : "",        //手机号
              "real_id" : "",        //身份证号
              "r2id" : "",        //R2账号
          }
      ]
  }
  }),

  1003: mockData({
    "body" : 
{
    "MT_GOLD": 1, //金币
    "MT_DIAMOND" : 2, //钻石
    "MT_HERO_EXP" : 3, //英雄经验
	  "MT_FRIENDLY_POINT" : 4, //友情点
	  "MT_TONGTIAO" : 5, //同调币
  	"MT_MUSEUM" : 6, //博物馆纪念币
	"MT_ADVANCE_ARENA" : 7, //竞技场代币
	"MT_GANG" : 8, //公会代币
	"MT_QIANSAN" : 9, //遣散币
    "MT_ABYSS" : 10, //深渊币
    "level" : 11,             //玩家等级
    "cur_section_id" : 12,             //主线章节
    "cur_stage_id" : 13,             //主线关卡
    "score" : 14,             //战力
    "last_login_time" : 15,             //最后一次登录时间
    "last_logout_time" : 16,             //最后一次登出时间
    "create_time" : 17,             //角色创建时间
    "gang_guid" : 18,             //联盟ID
}
  }),

  1005: mockData({
    "body" : 
{
    "itemlist": //物品
    [
        {
            "id" : 1,           //ID
            "name" : "n1",           //名字
            "cnt" : 1,           //数量
            "timeout" : 0,             //过期时间，时间戳
            "index" : 1,             //在背包中的索引
        }
    ],
    "equiplist":  //装备
    [
        {
            "id" : 2,           //ID
            "name" : "n2",           //名字
            "cnt" : 1,           //数量
            "timeout" : 0,             //过期时间，时间戳
            "index" : 1,             //在背包中的索引
        }
    ],
    "herofraglist":  //觉醒者碎片
    [
        {
            "id" : 3,           //ID
            "name" : "n3",           //名字
            "cnt" : 2,           //数量
            "timeout" : 0,             //过期时间，时间戳
            "index" : 3,             //在背包中的索引
        }
    ],
    "cangpinlist":  //藏品碎品
    [
        {
            "id" : 4,           //ID
            "name" : "n4",           //名字
            "cnt" : 1,           //数量
            "timeout" : 0,             //过期时间，时间戳
            "index" : 2,             //在背包中的索引
        }
    ]
}
  }),

  1007: mockData({
    "body" : 
{
    "herolist":
    [
        {    
            "id" : 1,           //ID
            "name" : "英雄1",           //名字
            "index" : 3,             //在英雄背包中的索引
            "cnt" : 1,           //数量
            "level" : 2,         //等级
            "tongtiao_level" : 1,             //同调等级
            "final_quality" : 1,             //最终品质
            "bind_equip_level" : 1,             //绑定装备等级
            "equips":
            [
                {    
                    "part" : 1,           //装备部位，1武器/2防具/3帽子/4鞋子
                    "item_id" : 2,           //装备ID
                    "name" : "",           //名字
                    "camp" : "",             //阵营
                    "level" : "",         //等级
                    "exp" : "",             //经验
                }
            ],
            "cangpins":
            [
                {    
                    "part" : 1,           //部位，1-6
                    "item_id" : 2,           //藏品ID
                    "name" : "",           //名字
                    "star" : 5,         //星级
                }
            ]
        },
        {    
          "id" : 2,           //ID
          "name" : "英雄22",           //名字
          "index" : 3,             //在英雄背包中的索引
          "cnt" : 1,           //数量
          "level" : 2,         //等级
          "tongtiao_level" : 1,             //同调等级
          "final_quality" : 1,             //最终品质
          "bind_equip_level" : 1,             //绑定装备等级
          "equips":
          [
              {    
                  "part" : 1,           //装备部位，1武器/2防具/3帽子/4鞋子
                  "item_id" : 2,           //装备ID
                  "name" : "",           //名字
                  "camp" : "",             //阵营
                  "level" : "",         //等级
                  "exp" : "",             //经验
              }
          ],
          "cangpins":
          [
              {    
                  "part" : 1,           //部位，1-6
                  "item_id" : 2,           //藏品ID
                  "name" : "",           //名字
                  "star" : 5,         //星级
              }
          ]
      }
    ]
}
  }),

  1009: mockData({
    "body" : 
{
    "entrustlist": //交易委托列表
    [
        {
            "entrust_id" : "1234",        //委托id
            "item_id" : 1,        //物品id
            "name" : 2,           //名字
            "cnt" : 3,           //数量
            "type" : 1,           //交易方式, 1购买，2出售
            "price" : 5,         //单价
            "time" : 6,         //上架时间
        },
        {
          "entrust_id" : "5678",        //委托id
          "item_id" : 10,        //物品id
          "name" : 9,           //名字
          "cnt" : 8,           //数量
          "type" : 2,           //交易方式, 1购买，2出售
          "price" : 6,         //单价
          "time" : 5,         //上架时间
      }
    ]
}
  }),

  1013: mockData({
    "body" : 
{
    "headlist": //头像
    [
        {
            "id" : 1,        //id
            "name" : 2,           //名字
        }
    ],
    "headframelist": //头像框
    [
        {
            "id" : 1,        //id
            "name" : 2,           //名字
        }
    ],
    "backgroudlist": //名片
    [
        {
            "id" : 1,        //id
            "name" : 2,           //名字
        }
    ]
}
  })






}

class BaseReqService extends Service {
  async request(head = {}, body = {}, token_param_list = []) {

    // mock
    // var cmd = head.cmd
    // if (cmdMockResp[cmd]) {
    //   return cmdMockResp[cmd]
    // }

    this.logger.info({head, body, token_param_list})
    const genBody = this.ctx.helper.genBody;
    const req_url = this.ctx.request.body.req_url; // 服务器ip
    body.channel_id = this.ctx.user.channel_id; // channel_id
    try {
      const resp = await this.ctx.curl(req_url ? req_url : '', {
        timeout: 5000,
        method: 'POST',
        contentType: 'json', // 请求体为json
        dataType: 'json', // 响应体为json
        data: genBody(head, body, token_param_list),
        nestedQuerystring: true,
      });
      this.logger.info({resp: JSON.stringify(resp)})
      return resp
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }

  // 判断操作是否成功
  is_success(result) {
    if (result && result.data && result.data.head && (result.data.head.ret === 0 || result.data.head.ret === 1)) return true;
    return false;
  }

  // 时间输出函数
  prettyTime(t) {
    return moment(parseInt(t + '000')).format('YYYY-MM-DD HH:mm:ss');
  }
}

module.exports = BaseReqService;
