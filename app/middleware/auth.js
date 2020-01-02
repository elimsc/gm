'use strict';

const jwt = require('jsonwebtoken');

// 判断用户是否已登陆的中间件
module.exports = options => {
  return async function auth(ctx, next) {
    // 不需要判断是否登陆的路由：/api/login, 不以/api开头的路由
    if (ctx.request.url === '/api/login' || !ctx.request.url.startsWith('/api')) {
      await next();
      return;
    }

    const key = options.key;
    const authrization = ctx.get('Authorization');
    const userService = ctx.service.user;


    if (authrization) {
      try {
        let token = authrization.split('Bearer ')[1];
        const payload = await jwt.verify(token, key);
        const { username } = payload;
        // 判断该用户是否是合法的用户
        const user = await userService.findByUsername(username);
        // 判断token是否正确
        if (user && user.token === token) {
          // 设置默认的role值
          let role = 1;
          if (user.role) {
            role = user.role;
          }
          // 重新生成token
          if (ctx.request.url !== '/api/sysdata/prop' && ctx.request.method.toUpperCase() !== 'GET') { // 频繁请求的接口，不重新生成token
            const r = await userService.login({ username: user.username, password: user.password }, false);
            if (r) {
              token = r.token;
            }
          }
          ctx.user = { username, id: user.id, role, token };
          await next();
        } else {
          ctx.body = {
            code: -10,
            message: '没有登陆',
          };
        }
      } catch (e) {
        ctx.logger.error(e);
        ctx.body = {
          code: -10,
          message: '没有登陆',
        };
      }
    } else {
      ctx.body = {
        code: -10,
        message: '没有登陆',
      };
    }

  };
};
