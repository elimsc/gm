'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const { post } = require('../util');


describe('controller.player.playerinfo', () => {
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

  it('POST /api/player/list', async () => {
    const res = await post(app, '/api/player/list', token)
      .send({ type: '2', name: '512718', part_id: -1, req_url: 'http://192.168.1.205:20843/' });
    const body = res.body;
    assert(body.code === 0);
    assert(Array.isArray(body.payload));
  });

  it('POST player/playerinfo/basic-info', async () => {
    const res = await post(app, '/api/player/playerinfo/basic-info', token)
      .send({ guid: '1828468389845141691', part_id: -1, req_url: 'http://192.168.1.205:20843/' });
    const body = res.body;
    assert(body.code === 0);
    assert(Array.isArray(body.payload));
  });

  it('POST player/playerinfo/bag-info', async () => {
    const res = await post(app, '/api/player/playerinfo/bag-info', token)
      .send({ guid: '1828468389845141691', part_id: -1, req_url: 'http://192.168.1.205:20843/' });
    const body = res.body;
    assert(body.code === 0);
    assert(Array.isArray(body.payload));
  });

  it('POST player/playerinfo/warehouse-info', async () => {
    const res = await post(app, '/api/player/playerinfo/warehouse-info', token)
      .send({ guid: '1828468389845141691', part_id: -1, req_url: 'http://192.168.1.205:20843/' });
    const body = res.body;
    assert(body.code === 0);
    assert(Array.isArray(body.payload));
  });

  it('POST player/playerinfo/equip-info', async () => {
    const res = await post(app, '/api/player/playerinfo/equip-info', token)
      .send({ guid: '1828468389845141691', part_id: -1, req_url: 'http://192.168.1.205:20843/' });
    const body = res.body;
    assert(body.code === 0);
    assert(Array.isArray(body.payload));
  });

  it('POST player/playerinfo/skill-info', async () => {
    const res = await post(app, '/api/player/playerinfo/skill-info', token)
      .send({ guid: '1828468389845141691', part_id: -1, req_url: 'http://192.168.1.205:20843/' });
    const body = res.body;
    assert(body.code === 0);
    assert(Array.isArray(body.payload));
  });

  it('POST player/playerinfo/title-info', async () => {
    const res = await post(app, '/api/player/playerinfo/title-info', token)
      .send({ guid: '1828468389845141691', part_id: -1, req_url: 'http://192.168.1.205:20843/' });
    const body = res.body;
    assert(body.code === 0);
    assert(Array.isArray(body.payload));
  });

  it('POST player/playerinfo/pet-info', async () => {
    const res = await post(app, '/api/player/playerinfo/pet-info', token)
      .send({ guid: '1828468389845141691', part_id: -1, req_url: 'http://192.168.1.205:20843/' });
    const body = res.body;
    assert(body.code === 0);
    assert(Array.isArray(body.payload));
  });

  it('POST player/playerinfo/task-info', async () => {
    const res = await post(app, '/api/player/playerinfo/task-info', token)
      .send({ guid: '1828468389845141691', part_id: -1, req_url: 'http://192.168.1.205:20843/' });
    const body = res.body;
    assert(body.code === 0);
    assert(Array.isArray(body.payload));
  });

  it('POST player/playerinfo/home-info', async () => {
    const res = await post(app, '/api/player/playerinfo/home-info', token)
      .send({ guid: '1828468389845141691', part_id: -1, req_url: 'http://192.168.1.205:20843/' });
    const body = res.body;
    assert(body.code === 0);
    assert(Array.isArray(body.payload));
  });

  it('POST player/playerinfo/email-info', async () => {
    const res = await post(app, '/api/player/playerinfo/email-info', token)
      .send({ guid: '1828468389845141691', part_id: -1, req_url: 'http://192.168.1.205:20843/' });
    const body = res.body;
    assert(body.code === 0);
    assert(Array.isArray(body.payload));
  });

  it('POST player/playerinfo/marriage-info', async () => {
    const res = await post(app, '/api/player/playerinfo/marriage-info', token)
      .send({ guid: '1828468389845141691', part_id: -1, req_url: 'http://192.168.1.205:20843/' });
    const body = res.body;
    assert(body.code === 0);
    assert(Array.isArray(body.payload));
  });
});
