'use strict';


// 记录用户操作
module.exports = action => {
  return async function actlog(ctx, next) {
    await next();

    if (ctx.body.code === 0) { // 表示操作成功
      // const action = options.action;
      const actlogService = ctx.service.actlog;
      // console.log(ctx.user.channel_id);
      await actlogService.create({
        action,
        channel_id: ctx.user.channel_id,
        subject: ctx.user ? ctx.user.username : '',
        object: ctx.request.body.guid,
        part_id: ctx.request.body.part_id,
        data: JSON.stringify(ctx.request.body),
      });
    }
  };
};
