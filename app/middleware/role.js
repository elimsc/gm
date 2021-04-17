'use strict';


// 判断用户是否有有指定的权限
module.exports = options => {
  return async function role(ctx, next) {
    const exclude_urls = [
      'POST /api/srv/list',
      'POST /api/sysdata/prop',
      'POST /api/login',
      'POST /api/login/check',
      'POST /api/logout',
      'GET /api/user/actlog/current',
      'POST /api/user/change-pass',
      'GET /api/user/menu_sids'
    ];

    let hasPermission;
    const target_url = `${ctx.request.method} ${ctx.request.url.split('?')[0]}`;
    const authorityService = ctx.service.authority;
    if (exclude_urls.includes(target_url) || ctx.user.role == 10000) {
      hasPermission = true;
    } else {
      hasPermission = await authorityService.hasPermission(ctx.user.role, target_url);
    }

    // console.log(target_url);
    // console.log(hasPermission);

    if (hasPermission) {
      await next();
    } else {
      ctx.body = { code: -11, message: '没有权限' };
    }
  };
};
