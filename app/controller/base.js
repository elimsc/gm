'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  constructor(props) {
    super(props);
    this.logger.debug(this.ctx.request.body);
  }

  // 成功
  success(payload = {}, token = '', message = '操作成功') {
    const current_token = this.ctx.user && this.ctx.user.token ? this.ctx.user.token : '';
    return { code: 0, message, payload, token: token ? token : current_token };
  }

  // 一般失败, 通常由于客户端数据的错误导致
  failed(message = '数据错误') {
    const current_token = this.ctx.user && this.ctx.user.token ? this.ctx.user.token : '';
    return { code: 1, message, token: current_token };
  }

  successOrFailed(success) {
    if (success) {
      return this.success();
    } else {
      return this.failed();
    }
  }

  // 一般错误，一般在客户端数据正确而服务端错误时返回
  error(message = '服务端错误') {
    const current_token = this.ctx.user && this.ctx.user.token ? this.ctx.user.token : '';
    return { code: 2, message, token: current_token };
  }

  // 未登陆错误
  not_login(message = '未登陆') {
    return { code: -10, message };
  }

}

module.exports = BaseController;
