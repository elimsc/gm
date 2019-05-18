'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const { post } = require('../util');


describe('controller.user', () => {
  let token;
  beforeEach(() => {
    // 登陆
    return post(app, '/api/login')
      .send({ username: 'super', password: '7752d4ae56ef4e920c1dcb191a81886f', req_url: 'http://192.168.1.205:20843/' })
      .then(res => {
        const body = res.body;
        token = body.token;
      });
  });

});
