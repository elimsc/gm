'use strict';

const BaseController = require('./base');

class LoginController extends BaseController {
  /**
   * POST /api/login
   * 处理用户登陆逻辑
   */
  async login() {
    const { ctx } = this;
    const userService = ctx.service.user;
    const { username, password } = ctx.request.body;
    const r = await userService.login({ username, password }); // 登陆
    if (r) {
      ctx.body = this.success({}, r.token);
    } else {
      ctx.body = this.error();
    }
  }

  /**
   * POST /api/login/check
   * 检查当前用户是否已登陆
   */
  async check() {
    const { ctx } = this;
    if (ctx.user) {
      ctx.body = this.success({ username: ctx.user.username, role: ctx.user.role });
    } else {
      ctx.body = this.not_login();
    }
  }

  /**
   * POST /api/logout
   * 用户注销
   */
  async logout() {
    const { ctx } = this;
    const userService = ctx.service.user;
    if (userService.update({ id: ctx.user.id, token: '' })) {
      ctx.body = this.success({}, 'not-login');
    } else {
      ctx.body = this.error();
    }
  }

}


module.exports = LoginController;
