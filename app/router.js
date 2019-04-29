'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  const auth = app.middleware.auth({ key: app.config.auth.key });
  const role_super = app.middleware.role({ role: 3 });
  const role_operation = app.middleware.role({ role: 2 });

  router.get('/api/demo', controller.home.demo);

  // 登陆相关
  router.post('/api/login', controller.login.login);
  router.post('/api/login/check', auth, controller.login.check);
  router.post('/api/logout', auth, controller.login.logout);

  // 管理员相关
  router.post('/api/user', auth, role_super, controller.user.create); // 添加管理员
  router.get('/api/user/list', auth, role_super, controller.user.list); // 获取管理员列表
  router.post('/api/user/update', auth, role_super, controller.user.update); // 更新管理员信息

  // 广播相关
  router.get('/api/broadcast/tpl/list', auth, role_operation, controller.broadcast.listTpl); // 显示所有的公告模板
  router.post('/api/broadcast/tpl/add', auth, role_operation, controller.broadcast.addTpl); // 添加公告模板
  router.delete('/api/broadcast/tpl/:id', auth, role_operation, controller.broadcast.deleteTpl);

  // 玩家相关
  router.post('/api/player/list', auth, controller.player.list);
  router.post('/api/player/basic-info', auth, controller.player.basicInfo);
  router.post('/api/player/bag-info', auth, controller.player.bagInfo);
  router.post('/api/player/warehouse-info', auth, controller.player.wareHouseInfo);
  router.post('/api/player/equip-info', auth, controller.player.equipInfo);
  router.post('/api/player/skill-info', auth, controller.player.skillInfo);
  router.post('/api/player/title-info', auth, controller.player.titleInfo);
  router.post('/api/player/pet-info', auth, controller.player.petInfo);
  router.post('/api/player/task-info', auth, controller.player.taskInfo);

  // router.all('/api/*', controller.home.api);
  router.get('*', controller.home.index);
};
