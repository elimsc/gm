'use strict';

const Service = require('egg').Service;
const genBody = require('../util/gmsrv').genBody;

class BaseReqService extends Service {
  async request(url, head = {}, body = {}, token_param_list = []) {
    return this.ctx.curl(url, {
      dataType: 'json',
      data: genBody(head, body, token_param_list),
      nestedQuerystring: true,
    });
  }
}

module.exports = BaseReqService;
