'use strict';

const BaseController = require('./base');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class LoginController extends BaseController {
  /**
   * POST /api/login
   * 处理用户登陆逻辑
   */
  async login() {
    const { ctx, app } = this;
    const userService = ctx.service.user;
    const { username, password } = ctx.request.body;
    // 查数据库，判断密码是否正确
    const user = await userService.findByUsername(username);
    if (user && user.password && bcrypt.compareSync(password, user.password)) {
      try {
        // 生成token
        const token = jwt.sign({ username }, app.config.auth.key, { expiresIn: '7d' });
        const token_write_su = userService.update({ id: user.id, token }); // 更新token
        if (token_write_su) {
          ctx.body = this.success({ token });
        } else { // token写入失败
          ctx.body = this.error();
        }
      } catch (e) {
        ctx.body = this.error();
      }

    } else {
      ctx.body = this.failed();
    }
  }

  /**
   * POST /api/login/check
   * 检查当前用户是否已登陆
   */
  async check() {
    const { ctx } = this;
    const userService = ctx.service.user;
    const username = ctx.user.username;
    const user = userService.findByUsername(username);
    if (user) {
      ctx.body = this.success({ username, id: user.id, role: ctx.user.role });
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
      ctx.body = this.success();
    } else {
      ctx.body = this.error();
    }
  }

}


module.exports = LoginController;
