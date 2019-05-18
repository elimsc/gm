'use strict';

const { app, mock, assert } = require('egg-mock/bootstrap');

describe('service.user.list()', () => {
  it('should work', async () => {
    const ctx = app.mockContext();
    const users = await ctx.service.user.list({ pageSize: 2, page: 1 });
    assert(users.length === 2);
  });
});

describe('service.user.count()', () => {
  it('should work', async () => {
    const ctx = app.mockContext();
    const count1 = await ctx.service.user.count({ username: 'super' });
    const count2 = await ctx.service.user.count({ username: 'I dont know' });
    assert(count1 === 1);
    assert(count2 === 0);
  });
});

describe('service.user.findByUsername()', () => {
  it('should work', async () => {
    const ctx = app.mockContext();
    const user = await ctx.service.user.findByUsername('super');
    assert(user.username === 'super');
    assert(user.role === 3);
  });
});

describe('service.user.create() and service.user.delete()', () => {
  it('should work', async () => {
    const ctx = app.mockContext();
    const count1 = await ctx.service.user.count({});

    // user exists, return false
    const r = await ctx.service.user.create({ username: 'super', password: '111' });
    assert(r === false);

    // success insert
    const r1 = await ctx.service.user.create({ username: 'test1', password: '111' });
    assert(r1 === true);
    const count2 = await ctx.service.user.count({});
    assert(count2 === count1 + 1);
    // 删除测试数据
    const r3 = await ctx.service.user.delete('test1');
    assert(r3 === true);
    const count3 = await ctx.service.user.count({});
    assert(count3 === count1);
  });
});

describe('service.user.update()', () => {
  it('should work', async () => {
    const ctx = app.mockContext();
    const r = await ctx.service.user.update({ id: 1, role: 2 });
    assert(r === true);

    const user = await ctx.service.user.findByUsername('super');
    assert(user.role === 2);

    // 撤回操作
    await ctx.service.user.update({ id: 1, role: 3 });

  });
});
