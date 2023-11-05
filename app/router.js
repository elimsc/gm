'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // const role_super = app.middleware.role({ role: 3 });
  // const role_operation = app.middleware.role({ role: 2 });
  const actlog = app.middleware.actlog;

  // 服务器列表
  router.post('/api/srv/list', controller.srv.list);

  // 系统相关数据
  router.post('/api/sysdata/prop', controller.sysdata.prop); // 系统道具列表

  // 登陆相关
  router.post('/api/login', controller.login.login);
  router.post('/api/login/check', controller.login.check);
  router.post('/api/logout', controller.login.logout);

  // 当前用户
  router.get('/api/user/actlog/current', controller.user.curActlog); // 当前登陆管理员的操作记录
  router.post('/api/user/change-pass', actlog('修改自身密码'), controller.user.changePass); // 更新管理员信息

  // 获取当前用户的菜单
  router.get('/api/user/menu_sids', controller.user.menuSids); // 获取用户菜单列表

  // GM管理
  router.post('/api/user', actlog('添加管理员'), controller.user.create); // 添加管理员
  router.get('/api/user/list', controller.user.list); // 获取管理员列表
  router.post('/api/user/update', actlog('超级管理员更新管理员信息'), controller.user.update); // 更新管理员信息
  router.get('/api/user/actlog/list', controller.user.actlogList); // 所有的操作记录
  router.post('/api/user/delete', actlog('超级管理员删除管理员'), controller.user.delete);
  router.get('/api/user/rolelist', controller.user.roleList); // 角色列表，供添加或更新用户时使用

  // 权限管理
  router.get('/api/authority/menu/list', controller.authority.menuList); // 菜单列表
  router.post('/api/authority/menu/create', actlog('权限-新增菜单'), controller.authority.createMenu); // 新增菜单
  router.post('/api/authority/menu/update', actlog('权限-更新菜单'), controller.authority.updateMenu); // 更新菜单
  router.post('/api/authority/menu/delete', actlog('权限-删除菜单'), controller.authority.deleteMenu); // 删除菜单
  router.get('/api/authority/menu/tree', controller.authority.menuTree); // 菜单树结构
  router.get('/api/authority/role/list', controller.authority.roleList); // 角色列表
  router.get('/api/authority/role/one', controller.authority.oneRole); // 一个角色
  router.post('/api/authority/role/create', actlog('权限-新增角色'), controller.authority.createRole); // 新增角色
  router.post('/api/authority/role/update', actlog('权限-更新角色'), controller.authority.updateRole); // 更新角色
  router.post('/api/authority/role/delete', actlog('权限-删除角色'), controller.authority.deleteRole); // 删除角色

  // 举报信息查询
  router.get('/api/jubao/listgroup', controller.jubao.listGroupByTargetGuid);
  router.get('/api/jubao/detailByGuid', controller.jubao.detailByTargetGuid);
  router.post('/api/jubao/deleteByGuid', actlog('举报页面-删除记录'), controller.jubao.deleteByTargetGuid);
  router.post('/api/jubao/ban', actlog('举报信息查询页面-封号'), controller.jubao.ban);
  router.post('/api/jubao/ban-talk', actlog('举报信息查询页面-禁言'), controller.jubao.banTalk);

  // 服务器广播
  router.get('/api/broadcast/tpl/list', controller.broadcast.listTpl); // 显示所有的公告模板
  router.post('/api/broadcast/tpl/add', actlog('添加公告模板'), controller.broadcast.addTpl); // 添加公告模板
  router.post('/api/broadcast/tpl/delete', actlog('删除公告模板'), controller.broadcast.deleteTpl); // 删除公告模板
  router.post('/api/broadcast/add', actlog('发布服务器广播'), controller.broadcast.addBroadcast); // 服务器广播

  // 玩家操作--玩家基本信息
  router.post('/api/player/list', controller.player.playerinfo.list); // 玩家列表
  router.post('/api/player/list/batch', controller.player.playerinfo.batchList); // 批量玩家列表(可以同时查询多个角色名)
  router.post('/api/player/playerinfo/basic-info', controller.player.playerinfo.basicInfo); // 角色基本信息
  router.post('/api/player/playerinfo/bag-info', controller.player.playerinfo.bagInfo); // 角色背包信息
  router.post('/api/player/playerinfo/hero-info', controller.player.playerinfo.heroInfo); // 英雄信息
  router.post('/api/player/playerinfo/entrust-info', controller.player.playerinfo.entrustInfo); // 交易信息
  router.post('/api/player/playerinfo/dress-info', controller.player.playerinfo.dressInfo); // 个性化装扮信息
  router.post('/api/player/playerinfo/warehouse-info', controller.player.playerinfo.wareHouseInfo); // 角色仓库信息
  router.post('/api/player/playerinfo/equip-info', controller.player.playerinfo.equipInfo); // 角色装备信息
  router.post('/api/player/playerinfo/dec-info', controller.player.playerinfo.decInfo); // 角色饰品信息
  router.post('/api/player/playerinfo/skill-info', controller.player.playerinfo.skillInfo); // 角色技能信息
  router.post('/api/player/playerinfo/title-info', controller.player.playerinfo.titleInfo); // 角色称号信息
  router.post('/api/player/playerinfo/pet-info', controller.player.playerinfo.petInfo); // 角色宠物信息
  router.post('/api/player/playerinfo/task-info', controller.player.playerinfo.taskInfo); // 角色任务信息
  router.post('/api/player/playerinfo/home-info', controller.player.playerinfo.homeInfo); // 角色家园信息
  router.post('/api/player/playerinfo/email-info', controller.player.playerinfo.emailInfo); // 角色邮件信息
  router.post('/api/player/playerinfo/marriage-info', controller.player.playerinfo.marriageInfo); // 社交信息
  router.post('/api/player/entrust-offline', controller.player.playerinfo.entrustOffline); // 交易下线
  

  // 玩家操作--封号禁言
  router.post('/api/player/ban/account', actlog('封号'), controller.player.ban.banAccount); // 封号
  router.post('/api/player/ban/account-r', actlog('解除封号'), controller.player.ban.removeAccountBan); // 解除封号
  router.post('/api/player/playerinfo/ban-account-info', controller.player.ban.banAccountLog); // 封号记录
  router.post('/api/player/playerinfo/ban-talk-info', controller.player.ban.banTalkLog); // 禁言记录
  router.post('/api/player/ban/talk', actlog('禁言'), controller.player.ban.banTalk); // 禁言
  router.post('/api/player/ban/talk-r', actlog('解除禁言'), controller.player.ban.removeTalkBan); // 解除禁言
  router.post('/api/player/playerinfo/black-list-info', controller.player.ban.blackListInfo); // 黑名单记录
  router.post('/api/player/ban/set-black-list', actlog('设置黑名单'), controller.player.ban.setBlackList); // 设置黑名单

  // 玩家操作--GM操作
  router.post('/api/player/gmact/money', actlog('发放货币（邮件）'), controller.player.gmact.money); // 发放货币
  router.post('/api/player/gmact/prop', actlog('发放道具（邮件）'), controller.player.gmact.prop); // 发放道具
  router.post('/api/player/gmact/reissue', actlog('充值补发'), controller.player.gmact.reissue); // 充值补发
  router.post('/api/player/gmact/exp', actlog('向玩家发放经验（邮件）'), controller.player.gmact.exp); // 玩家发放经验
  // router.post('/api/player/gmact/pet-exp',  actlog( '向宠物发放经验' ), controller.player.gmact.petExp); // 宠物发放经验
  router.post('/api/player/gmact/player-level', actlog('设置角色等级'), controller.player.gmact.setPlayerLevel); // 设置玩家等级
  router.post('/api/player/gmact/change-hero-data', actlog('修改英雄数据'), controller.player.gmact.changeHeroData);
  router.post('/api/player/gmact/change-player-data', actlog('修改角色数据'), controller.player.gmact.changePlayerData);
  router.post('/api/player/gmact/pet-level', actlog('设置宠物等级'), controller.player.gmact.setPetLevel); // 设置宠物等级
  router.post('/api/player/gmact/pet-lflevel', actlog('设置宠物炼符等级'), controller.player.gmact.setPetLflevel); // 设置宠物等级
  router.post('/api/player/gmact/pet-praclevel', actlog('设置宠物修炼等级'), controller.player.gmact.setPetPraclevel); // 设置宠物等级
  router.post('/api/player/gmact/add-title', actlog('添加称号'), controller.player.gmact.addTitle); // 添加称号
  router.post('/api/player/gmact/del-title', actlog('删除称号'), controller.player.gmact.delTitle); // 添加称号
  router.post('/api/player/gmact/forcedown', actlog('强制下线'), controller.player.gmact.forcedown); // 踢玩家下线
  router.post('/api/player/gmact/change-pass', actlog('修改密码'), controller.player.gmact.changePass); // 修改密码
  router.post('/api/player/gmact/untie-phone', actlog('解除绑定手机'), controller.player.gmact.untiePhone); // 解除绑定手机
  router.post('/api/player/gmact/untie-r2', actlog('解除R2Game账号绑定'), controller.player.gmact.untieR2); // 解除R2Game账号绑定
  router.post('/api/player/gmact/award-d', actlog('物品发放（直接）'), controller.player.gmact.awardD); // 物品发放（直接）
  router.post('/api/player/gmact/del-mail', actlog('删除邮件'), controller.player.gmact.delMail); // 删除邮件

  // 玩家操作 -- 清除数据
  router.post('/api/player/clear/secure-code', actlog('清除安全码'), controller.player.clear.clearSecureCode); // 清除安全码
  router.post('/api/player/clear/un-gang', actlog('清除非正常联盟数据'), controller.player.clear.clearUnGang); // 清除非正常联盟数据
  router.post('/api/player/clear/un-task', actlog('清除非正常任务'), controller.player.clear.clearUnTask); // 清除非正常任务

  // 批量操作
  router.post('/api/batchact/award', actlog('批量发放道具'), controller.batchact.award); // 批量发放道具
  router.post('/api/batchact/ban-account', actlog('批量封号'), controller.batchact.banAccount); // 批量发放道具
  router.post('/api/batchact/ban-talk', actlog('批量禁言'), controller.batchact.banTalk); // 批量发放道具
  router.get('/api/batchact/export-chatlog', actlog('导出聊天记录'), controller.batchact.exportChatlog); // 导出聊天记录
  router.post('/api/batchact/export-blacklist', actlog('导出黑名单'), controller.batchact.exportBlacklist); // 导出黑名单

  // 联盟操作
  router.post('/api/gang/list', controller.gang.list); // 联盟列表
  router.post('/api/gang/info', controller.gang.info); // 联盟信息
  router.post('/api/gang/ban', actlog('联盟操作--封号'), controller.gang.ban);
  router.post('/api/gang/notice', actlog('联盟操作--修改公告'), controller.gang.notice);
  router.post('/api/gang/dismiss', actlog('联盟操作--解散联盟'), controller.gang.dismiss);
  router.post('/api/gang/gmins', actlog('联盟操作--GM指令'), controller.gang.gmIns);

  // 充值上报
  router.post('/api/moneyreport/report', actlog('充值上报'), controller.moneyreport.report);

  // 系统操作
  router.post('/api/sysact/gmins', actlog('GM指令'), controller.sysact.gmins); // GM指令
  router.post('/api/sysact/listpayblacklist', controller.sysact.listPayBlacklist); // 查询现在支付黑白名单
  router.post('/api/sysact/updatepayblacklist', actlog('增删现在支付黑白名单'), controller.sysact.updatePayBlacklist);
  router.post('/api/sysact/snapshotimport', actlog('角色快照导入'), controller.sysact.snapshotImport); // 角色快照导入
  router.post('/api/sysact/add_ip_black_list', actlog('添加ip黑名单'), controller.sysact.addIpBlackList);
  router.post('/api/sysact/del_ip_black_list', actlog('删除ip黑名单'), controller.sysact.delIpBlackList);
  router.get('/api/sysact/ip_black_list', controller.sysact.listIpBlackList);

  // ProjectA公告
  router.post('/api/projecta/ann/create-type', actlog('ProjectA-创建公告类型'), controller.projecta.ann.createType);
  router.get('/api/projecta/ann/list-type', controller.projecta.ann.listType);
  router.post('/api/projecta/ann/update-type', actlog('ProjectA-更新公告类型'), controller.projecta.ann.updateType);
  router.post('/api/projecta/ann/delete-type', actlog('ProjectA-删除公告类型'), controller.projecta.ann.deleteType);
  router.post('/api/projecta/ann/create-ann', actlog('ProjectA-创建公告'), controller.projecta.ann.createAnn);
  router.get('/api/projecta/ann/list-ann', controller.projecta.ann.listAnn);
  router.post('/api/projecta/ann/update-ann', actlog('ProjectA-更新公告'), controller.projecta.ann.updateAnn);
  router.post('/api/projecta/ann/delete-ann', actlog('ProjectA-删除公告'), controller.projecta.ann.deleteAnn);
  router.post('/api/projecta/ann/create-subcontent', actlog('ProjectA-创建公告子标题'), controller.projecta.ann.createAnnSubcontent);
  router.get('/api/projecta/ann/list-subcontent', controller.projecta.ann.listAnnSubcontent);
  router.post('/api/projecta/ann/update-subcontent', actlog('ProjectA-更新公告子标题'), controller.projecta.ann.updateAnnSubcontent);
  router.post('/api/projecta/ann/delete-subcontent', actlog('ProjectA-删除公告子标题'), controller.projecta.ann.deleteAnnSubcontent);


  // public api
  router.post('/p/account/ban', actlog('外部接口:封号'), controller.player.ban.banAccount); // 封号
  router.post('/p/player/forcedown', actlog('外部接口:强制下线'), controller.player.gmact.forcedown); // 踢玩家下线


  // router.all('/api/*', controller.home.api);
  router.get('*', controller.home.index);
};
