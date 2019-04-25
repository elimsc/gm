'use strict';

const Service = require('egg').Service;

class BaseReqService extends Service {
  async request(url, head = {}, body = {}, token_param_list = []) {
    const genBody = this.ctx.helper.genBody;
    return this.ctx.curl(url, {
      dataType: 'json',
      data: genBody(head, body, token_param_list),
      nestedQuerystring: true,
    });
  }
}

module.exports = BaseReqService;
