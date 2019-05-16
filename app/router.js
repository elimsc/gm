'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  const role_super = app.middleware.role({ role: 3 });
  const role_operation = app.middleware.role({ role: 2 });
  const actlog = app.middleware.actlog;

  router.get('/api/demo', controller.home.demo);

  // 服务器列表
  router.post('/api/srv/list', controller.srv.list);

  // 登陆相关
  router.post('/api/login', controller.login.login);
  router.post('/api/login/check', controller.login.check);
  router.post('/api/logout', controller.login.logout);

  // GM管理
  router.post('/api/user', role_super, actlog({ action: '添加管理员' }), controller.user.create); // 添加管理员
  router.get('/api/user/list', role_super, controller.user.list); // 获取管理员列表
  router.post('/api/user/update', role_super, actlog({ action: '修改管理员权限' }), controller.user.update); // 更新管理员信息
  router.get('/api/user/actlog/list', role_super, controller.user.actlogList); // 所有的操作记录
  router.get('/api/user/actlog/current', role_super, controller.user.curActlog); // 当前登陆管理员的操作记录
  router.post('/api/user/change-pass', role_super, actlog({ action: '修改自身密码' }), controller.user.changePass); // 更新管理员信息

  // 服务器广播
  router.get('/api/broadcast/tpl/list', role_operation, controller.broadcast.listTpl); // 显示所有的公告模板
  router.post('/api/broadcast/tpl/add', role_operation, actlog({ action: '添加公告模板' }), controller.broadcast.addTpl); // 添加公告模板
  router.delete('/api/broadcast/tpl/:id', role_operation, actlog({ action: '删除公告模板' }), controller.broadcast.deleteTpl); // 删除公告模板
  router.post('/api/broadcast/add', role_operation, actlog({ action: '发布服务器广播' }), controller.broadcast.addBroadcast); // 服务器广播

  // 玩家操作--玩家基本信息
  router.post('/api/player/list', controller.player.playerinfo.list); // 玩家列表
  router.post('/api/player/playerinfo/basic-info', controller.player.playerinfo.basicInfo); // 角色基本信息
  router.post('/api/player/playerinfo/bag-info', controller.player.playerinfo.bagInfo); // 角色背包信息
  router.post('/api/player/playerinfo/warehouse-info', controller.player.playerinfo.wareHouseInfo); // 角色仓库信息
  router.post('/api/player/playerinfo/equip-info', controller.player.playerinfo.equipInfo); // 角色装备信息
  router.post('/api/player/playerinfo/skill-info', controller.player.playerinfo.skillInfo); // 角色技能信息
  router.post('/api/player/playerinfo/title-info', controller.player.playerinfo.titleInfo); // 角色称号信息
  router.post('/api/player/playerinfo/pet-info', controller.player.playerinfo.petInfo); // 角色宠物信息
  router.post('/api/player/playerinfo/task-info', controller.player.playerinfo.taskInfo); // 角色任务信息
  router.post('/api/player/playerinfo/home-info', controller.player.playerinfo.homeInfo); // 角色家园信息
  router.post('/api/player/playerinfo/email-info', controller.player.playerinfo.emailInfo); // 角色邮件信息
  router.post('/api/player/playerinfo/marriage-info', controller.player.playerinfo.marriageInfo);

  // 玩家操作--封号禁言
  router.post('/api/player/ban/account', role_operation, actlog({ action: '封号' }), controller.player.ban.banAccount); // 封号
  router.post('/api/player/ban/account-r', role_operation, actlog({ action: '解除封号' }), controller.player.ban.removeAccountBan); // 解除封号
  router.post('/api/player/playerinfo/ban-account-info', role_operation, controller.player.ban.banAccountLog); // 禁言记录
  router.post('/api/player/playerinfo/ban-talk-info', role_operation, controller.player.ban.banTalkLog); // 禁言记录
  router.post('/api/player/ban/talk', role_operation, actlog({ action: '禁言' }), controller.player.ban.banTalk); // 禁言
  router.post('/api/player/ban/talk-r', role_operation, actlog({ action: '解除禁言' }), controller.player.ban.removeTalkBan); // 解除禁言

  // 玩家操作--GM操作
  router.post('/api/player/gmact/money', role_operation, actlog({ action: '发放货币' }), controller.player.gmact.money); // 发放货币
  router.post('/api/player/gmact/prop', role_operation, actlog({ action: '发放道具' }), controller.player.gmact.prop); // 发放道具
  router.post('/api/player/gmact/exp', role_operation, actlog({ action: '向玩家发放经验' }), controller.player.gmact.exp); // 玩家发放经验
  router.post('/api/player/gmact/pet-exp', role_operation, actlog({ action: '向宠物发放经验' }), controller.player.gmact.petExp); // 宠物发放经验
  router.post('/api/player/gmact/player-level', role_operation, actlog({ action: '设置角色等级' }), controller.player.gmact.setPlayerLevel); // 设置玩家等级
  router.post('/api/player/gmact/pet-level', role_operation, actlog({ action: '设置宠物等级' }), controller.player.gmact.setPetLevel); // 设置宠物等级
  router.post('/api/player/gmact/pet-lflevel', role_operation, actlog({ action: '设置宠物炼符等级' }), controller.player.gmact.setPetLflevel); // 设置宠物等级
  router.post('/api/player/gmact/pet-praclevel', role_operation, actlog({ action: '设置宠物修炼等级' }), controller.player.gmact.setPetPraclevel); // 设置宠物等级
  router.post('/api/player/gmact/add-title', role_operation, actlog({ action: '添加称号' }), controller.player.gmact.addTitle); // 添加称号
  router.post('/api/player/gmact/del-title', role_operation, actlog({ action: '删除称号' }), controller.player.gmact.delTitle); // 添加称号
  router.post('/api/player/gmact/forcedown', role_operation, controller.player.gmact.forcedown); // 踢玩家下线
  router.post('/api/player/gmact/secure-code', role_operation, controller.player.gmact.secureCode); // 安全修改
  router.post('/api/player/gmact/change-pass', role_operation, controller.player.gmact.changePass); // 修改密码
  router.post('/api/player/gmact/untie-phone', role_operation, controller.player.gmact.untiePhone); // 解除绑定手机

  // 玩家操作 -- 清除数据
  router.post('/api/player/clear/secure-code', role_operation, controller.player.clear.clearSecureCode); // 清除安全码
  router.post('/api/player/clear/un-gang', role_operation, controller.player.clear.clearUnGang); // 清除非正常帮会数据
  router.post('/api/player/clear/un-task', role_operation, controller.player.clear.clearUnTask); // 清除非正常任务

  // 批量操作
  router.post('/api/batchact', role_operation, controller.batchact.act);
  router.post('/api/batchact/award', role_operation, actlog({ action: '批量发放道具' }), controller.batchact.award); // 批量发放道具

  // 系统操作
  router.post('/api/sysact/activity/update', role_super, controller.sysact.updateActivity);
  router.post('/api/sysact/activity/list', role_super, controller.sysact.activityList);
  router.post('/api/sysact/gmins', role_super, controller.sysact.gmins);
  router.post('/api/sysact/srvforcedown', role_super, controller.sysact.srvForceDown);


  // router.all('/api/*', controller.home.api);
  router.get('*', controller.home.index);
};
