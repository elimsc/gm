'use strict';

const { app, mock, assert } = require('egg-mock/bootstrap');

describe('service.anntpl.list()', () => {
  it('should work', async () => {
    const ctx = app.mockContext();
    const tpls = await ctx.service.anntpl.list();
    assert(tpls.length === 3);
    const ids = tpls.map(tpl => tpl.id);
    assert.deepStrictEqual(ids, [ 1, 2, 3 ]);
  });
});

describe('service.anntpl.create() and service.anntpl.delete()', () => {
  it('should work', async () => {
    const ctx = app.mockContext();

    // insert
    const r = await ctx.service.anntpl.create({ content: 'test content' });
    assert(r === true);

    const tpls = await ctx.service.anntpl.list();
    const count1 = tpls.length;

    // delete
    const insert_id = tpls[count1 - 1].id;
    const r1 = await ctx.service.anntpl.delete(insert_id);
    assert(r1 === true);
  });
});