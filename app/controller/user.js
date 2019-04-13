'use strict';

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
}

module.exports = UserController;
