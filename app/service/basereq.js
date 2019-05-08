'use strict';

const Service = require('egg').Service;

const URL = 'http://192.168.1.205:20843/';

class BaseReqService extends Service {
  async request(head = {}, body = {}, token_param_list = []) {
    const genBody = this.ctx.helper.genBody;
    const req_url = this.ctx.request.body.req_url; // 服务区ip
    try {
      return await this.ctx.curl(req_url ? req_url : URL, {
        timeout: 1000,
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
