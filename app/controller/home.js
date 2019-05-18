'use strict';

const BaseController = require('./base');

class HomeController extends BaseController {
  async index() {
    await this.ctx.render('index.html');
  }

  async demo() {
    const playerService = this.ctx.service.user;
    const result = await playerService.list({page: 1, pageSize: 10});
    this.ctx.body = result;
  }
}

module.exports = HomeController;
