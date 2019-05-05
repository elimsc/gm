'use strict';
/**
 * GM管理
 */

const BaseController = require('./base');

class UserController extends BaseController {
  // 新增管理员
  // POST /user
  async create() {
    const userService = this.ctx.service.user;
    const success = await userService.create(this.ctx.request.body);
    if (success) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.failed();
    }
  }

  /**
   * POST /user/update
   * 修改管理员数据
   */
  async update() {
    const userService = this.ctx.service.user;
    const success = await userService.update(this.ctx.request.body);
    if (success) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.failed();
    }
  }

  /**
   * GET /user/list
   * 获取管理员列表
   */
  async list() {
    const userService = this.ctx.service.user;
    const queries = this.ctx.queries;
    let pageSize = 10;
    let page = 1;
    let username = '';
    if (queries.pageSize) {
      pageSize = queries.pageSize[0];
    }
    if (queries.page) {
      page = queries.page[0];
    }
    if (queries.username) {
      username = queries.username[0];
    }
    const users = await userService.list({ page, pageSize, username });
    const count = await userService.count({ username });
    this.ctx.body = this.success({ users, count });
  }

  /**
   * GET user/actlog/list
   * 所有的操作记录（超级管理员用）
   */
  async actlogList() {
    const actlogService = this.ctx.service.actlog;
    const queries = this.ctx.queries;
    let pageSize = 10;
    let page = 1;
    let subject = '';
    if (queries.pageSize) {
      pageSize = queries.pageSize[0];
    }
    if (queries.page) {
      page = queries.page[0];
    }
    if (queries.subject) {
      subject = queries.subject[0];
    }

    const logs = await actlogService.list({ page, pageSize, subject });
    const count = await actlogService.count({ subject });

    this.ctx.body = this.success({ logs, count });
  }

  /**
   * GET user/actlog/current
   * 当前登陆用户的操作记录（普通管理员用）
   */
  async curActlog() {
    const actlogService = this.ctx.service.actlog;
    const queries = this.ctx.queries;
    let pageSize = 10;
    let page = 1;
    if (queries.pageSize) {
      pageSize = queries.pageSize[0];
    }
    if (queries.page) {
      page = queries.page[0];
    }

    const subject = this.ctx.user.username;

    const logs = await actlogService.list({ page, pageSize, subject });
    const count = await actlogService.count({ subject });

    this.ctx.body = this.success({ logs, count });
  }

  /**
   * POST user/change-pass
   * 管理员修改自己的密码
   */
  async changePass() {
    const userService = this.ctx.service.user;
    const success = await userService.update({ id: this.ctx.user.id, password: this.ctx.request.body.password });
    if (success) {
      this.ctx.body = this.success();
    } else {
      this.ctx.body = this.failed();
    }
  }
}

module.exports = UserController;
