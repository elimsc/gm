'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const { post } = require('../util');


describe('controller.login: login() and logout()', () => {
  it('check(): without token should be not login', async () => {
    const res = await post(app, '/api/login/check');
    const body = res.body;
    assert(body.code === -10);
  });

  it('should login and logout work', async () => {
    // 登陆
    let res = await post(app, '/api/login')
      .send({ username: 'super', password: '7752d4ae56ef4e920c1dcb191a81886f', req_url: 'http://192.168.1.205:20843/' });
    let body = res.body;
    assert(body.code === 0);
    const token = body.token;

    // 登出
    res = await post(app, '/api/logout', token)
      .send({ req_url: 'http://192.168.1.205:20843/' });
    body = res.body;
    assert(body.code === 0);
  });
});
