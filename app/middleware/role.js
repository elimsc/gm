'use strict';


// 判断用户是否有运营管理员权限
module.exports = options => {
  return async function role(ctx, next) {
    const expect_role = options.role;
    const current_role = ctx.user.role;
    if (current_role >= expect_role) {
      await next();
    } else {
      ctx.body = { code: -11, message: '没有权限' };
    }
  };
};
