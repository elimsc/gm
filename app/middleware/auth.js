'use strict';

const jwt = require('jsonwebtoken');

// 判断用户是否已登陆的中间件
module.exports = options => {
  return async function auth(ctx, next) {
    const key = options.key;
    const authrization = ctx.get('Authorization');

    if (authrization) {
      try {
        const token = authrization.split('Bearer ')[1];
        const payload = await jwt.verify(token, key);
        const { username } = payload;
        // 判断该用户是否是合法的用户
        const userService = ctx.service.user;
        const user = await userService.findByUsername(username);

        let role = 1;
        if (user.role) {
          role = user.role;
        }

        if (user && user.token === token) {
          ctx.user = { username, id: user.id, role };
          await next();
        } else {
          ctx.body = {
            code: -10,
            message: '没有登陆',
          };
        }
      } catch (e) {
        console.log(e);
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
