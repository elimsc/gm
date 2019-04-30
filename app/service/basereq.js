'use strict';

const Service = require('egg').Service;

const URL = 'http://192.168.1.205:20843/';

class BaseReqService extends Service {
  async request(head = {}, body = {}, token_param_list = []) {
    const genBody = this.ctx.helper.genBody;
    try {
      return await this.ctx.curl(URL, {
        timeout: 3000,
        method: 'POST',
        contentType: 'json', // 请求体为json
        dataType: 'json', // 响应体为json
        data: genBody(head, body, token_param_list),
        nestedQuerystring: true,
      });
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }
}

module.exports = BaseReqService;
