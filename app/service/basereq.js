'use strict';

const Service = require('egg').Service;
const moment = require('moment');

class BaseReqService extends Service {
  async request(head = {}, body = {}, token_param_list = []) {
    this.logger.info({head, body, token_param_list})
    const genBody = this.ctx.helper.genBody;
    const req_url = this.ctx.request.body.req_url; // 服务器ip
    body.channel_id = this.ctx.user.channel_id; // channel_id
    try {
      const resp = await this.ctx.curl(req_url ? req_url : '', {
        timeout: 5000,
        method: 'POST',
        contentType: 'json', // 请求体为json
        dataType: 'json', // 响应体为json
        data: genBody(head, body, token_param_list),
        nestedQuerystring: true,
      });
      this.logger.info({resp: JSON.stringify(resp)})
      return resp
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }

  // 判断操作是否成功
  is_success(result) {
    if (result && result.data && result.data.head && (result.data.head.ret === 0 || result.data.head.ret === 1)) return true;
    return false;
  }

  // 时间输出函数
  prettyTime(t) {
    return moment(parseInt(t + '000')).format('YYYY-MM-DD HH:mm:ss');
  }
}

module.exports = BaseReqService;
