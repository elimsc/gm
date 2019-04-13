'use strict';

const BaseController = require('./base');

class HomeController extends BaseController {
  async index() {
    await this.ctx.render('index.html');
  }

  async demo() {
    const playerService = this.ctx.service.player;
    const result = await playerService.list({ name: '123', type: 0 });
    this.ctx.body = result;
  }
}

module.exports = HomeController;
