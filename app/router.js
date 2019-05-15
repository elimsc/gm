'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  const auth = app.middleware.auth({ key: app.config.auth.key });
  const role_super = app.middleware.role({ role: 3 });
  const role_operation = app.middleware.role({ role: 2 });
  const actlog = app.middleware.actlog;

  router.get('/api/demo', controller.home.demo);

  // 服务器列表
  router.post('/api/srv/list', auth, controller.srv.list);

  // 登陆相关
  router.post('/api/login', controller.login.login);
  router.post('/api/login/check', auth, controller.login.check);
  router.post('/api/logout', auth, controller.login.logout);

  // GM管理
  router.post('/api/user', auth, role_super, actlog({ action: '添加管理员' }), controller.user.create); // 添加管理员
  router.get('/api/user/list', auth, role_super, controller.user.list); // 获取管理员列表
  router.post('/api/user/update', auth, role_super, actlog({ action: '修改管理员权限' }), controller.user.update); // 更新管理员信息
  router.get('/api/user/actlog/list', auth, role_super, controller.user.actlogList); // 所有的操作记录
  router.get('/api/user/actlog/current', auth, controller.user.curActlog); // 当前登陆管理员的操作记录
  router.post('/api/user/change-pass', auth, actlog({ action: '修改自身密码' }), controller.user.changePass); // 更新管理员信息

  // 服务器广播
  router.get('/api/broadcast/tpl/list', auth, role_operation, controller.broadcast.listTpl); // 显示所有的公告模板
  router.post('/api/broadcast/tpl/add', auth, role_operation, actlog({ action: '添加公告模板' }), controller.broadcast.addTpl); // 添加公告模板
  router.delete('/api/broadcast/tpl/:id', auth, role_operation, actlog({ action: '删除公告模板' }), controller.broadcast.deleteTpl); // 删除公告模板
  router.post('/api/broadcast/add', auth, role_operation, controller.broadcast.addBroadcast); // 服务器广播

  // 玩家操作--玩家基本信息
  router.post('/api/player/list', auth, controller.player.playerinfo.list); // 玩家列表
  router.post('/api/player/playerinfo/basic-info', auth, controller.player.playerinfo.basicInfo); // 角色基本信息
  router.post('/api/player/playerinfo/bag-info', auth, controller.player.playerinfo.bagInfo); // 角色背包信息
  router.post('/api/player/playerinfo/warehouse-info', auth, controller.player.playerinfo.wareHouseInfo); // 角色仓库信息
  router.post('/api/player/playerinfo/equip-info', auth, controller.player.playerinfo.equipInfo); // 角色装备信息
  router.post('/api/player/playerinfo/skill-info', auth, controller.player.playerinfo.skillInfo); // 角色技能信息
  router.post('/api/player/playerinfo/title-info', auth, controller.player.playerinfo.titleInfo); // 角色称号信息
  router.post('/api/player/playerinfo/pet-info', auth, controller.player.playerinfo.petInfo); // 角色宠物信息
  router.post('/api/player/playerinfo/task-info', auth, controller.player.playerinfo.taskInfo); // 角色任务信息
  router.post('/api/player/playerinfo/home-info', auth, controller.player.playerinfo.homeInfo); // 角色家园信息
  router.post('/api/player/playerinfo/email-info', auth, controller.player.playerinfo.emailInfo); // 角色邮件信息
  router.post('/api/player/playerinfo/marriage-info', auth, controller.player.playerinfo.marriageInfo);

  // 玩家操作--封号禁言
  router.post('/api/player/ban/account', auth, controller.player.ban.banAccount); // 封号
  router.post('/api/player/ban/account-r', auth, controller.player.ban.removeAccountBan); // 解除封号
  router.post('/api/player/playerinfo/ban-account-info', auth, controller.player.ban.banAccountLog); // 禁言记录
  router.post('/api/player/playerinfo/ban-talk-info', auth, controller.player.ban.banTalkLog); // 禁言记录
  router.post('/api/player/ban/talk', auth, controller.player.ban.banTalk); // 禁言
  router.post('/api/player/ban/talk-r', auth, controller.player.ban.removeTalkBan); // 解除禁言

  // 玩家操作--GM操作
  router.post('/api/player/gmact/money', auth, controller.player.gmact.money); // 发放货币
  router.post('/api/player/gmact/prop', auth, controller.player.gmact.prop); // 发放道具
  router.post('/api/player/gmact/exp', auth, controller.player.gmact.exp); // 添加/扣除禁言
  router.post('/api/player/gmact/add-title', auth, controller.player.gmact.addTitle); // 添加称号
  router.post('/api/player/gmact/del-title', auth, controller.player.gmact.delTitle); // 添加称号
  router.post('/api/player/gmact/prac-level', auth, controller.player.gmact.pracLevel); // 修改修炼等级
  router.post('/api/player/gmact/petsymbol-level', auth, controller.player.gmact.petsymbolLevel); // 修改宠物符等级
  router.post('/api/player/gmact/forcedown', auth, controller.player.gmact.forcedown); // 踢玩家下线
  router.post('/api/player/gmact/secure-code', auth, controller.player.gmact.secureCode); // 安全修改
  router.post('/api/player/gmact/change-pass', auth, controller.player.gmact.changePass); // 修改密码
  router.post('/api/player/gmact/untie-phone', auth, controller.player.gmact.untiePhone); // 解除绑定手机

  // 玩家操作 -- 清除数据
  router.post('/api/player/clear/secure-code', auth, controller.player.clear.clearSecureCode); // 清除安全码
  router.post('/api/player/clear/un-gang', auth, controller.player.clear.clearUnGang); // 清除非正常帮会数据
  router.post('/api/player/clear/un-task', auth, controller.player.clear.clearUnTask); // 清除非正常任务

  // 批量操作
  router.post('/api/batchact', auth, controller.batchact.act);
  router.post('/api/batchact/award', auth, controller.batchact.award); // 批量发放道具

  // 系统操作
  router.post('/api/sysact/activity/update', auth, controller.sysact.updateActivity);
  router.post('/api/sysact/activity/list', auth, controller.sysact.activityList);
  router.post('/api/sysact/gmins', auth, controller.sysact.gmins);
  router.post('/api/sysact/srvforcedown', auth, controller.sysact.srvForceDown);


  // router.all('/api/*', controller.home.api);
  router.get('*', controller.home.index);
};
