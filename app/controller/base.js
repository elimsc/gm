'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {

  // 成功
  success(payload = {}, message = '操作成功') {
    return { code: 0, message, payload };
  }

  // 一般失败, 通常由于客户端数据的错误导致
  failed(message = '数据错误') {
    return { code: 1, message };
  }

  // 一般错误，一般在客户端数据正确而服务端错误时返回
  error(message = '服务端错误') {
    return { code: 2, message };
  }

  // 未登陆错误
  not_login(message = '未登陆') {
    return { code: -10, message };
  }

}

module.exports = BaseController;
