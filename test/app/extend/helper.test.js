'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('extend.helper.tableInfoConv()', () => {
  it('should work', () => {
    const src = { name: 'name1', cnt: 2 };
    const tpl = { name: '名称', cnt: '数量' };
    const ctx = app.mockContext();

    assert.deepStrictEqual(ctx.helper.tableInfoConv(src, tpl, { name: v => v + 'test' }), [
      { key: 'name', title: '名称', value: 'name1test' },
      { key: 'cnt', title: '数量', value: 2 },
    ]);
  });
});


describe('extend.helper.tableInfoListConv()', () => {
  it('should work', () => {
    const src = [
      { name: 'name1', cnt: 1 },
      { name: 'name2', cnt: 2 },
    ];
    const tpl = { cnt: '数量', name: '名称' };
    const ctx = app.mockContext();

    assert.deepStrictEqual(ctx.helper.tableInfoListConv(src, tpl, { name: v => v + 'test' }), [
      [
        { key: 'cnt', title: '数量', value: 1 },
        { key: 'name', title: '名称', value: 'name1test' },

      ],
      [
        { key: 'cnt', title: '数量', value: 2 },
        { key: 'name', title: '名称', value: 'name2test' },
      ],
    ]);
  });
});

describe('extend.helper.genBody()', () => {
  it('should work', () => {
    const ctx = app.mockContext();

    const head = { cmd: 1001 };
    const body = { name: '512718', type: 2, part_id: -1 };
    const token_param_list = [ 'name', 'type' ];

    assert.equal(ctx.helper.genBody(head, body, token_param_list).head.token, '0ee5a8b670334f270247af87d781db2a');
  });
});
