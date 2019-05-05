'use strict';

const { app, mock, assert } = require('egg-mock/bootstrap');

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
    const tpl = { name: '名称', cnt: '数量' };
    const ctx = app.mockContext();

    assert.deepStrictEqual(ctx.helper.tableInfoListConv(src, tpl, { name: v => v + 'test' }), [
      [
        { key: 'name', title: '名称', value: 'name1test' },
        { key: 'cnt', title: '数量', value: 1 },
      ],
      [
        { key: 'name', title: '名称', value: 'name2test' },
        { key: 'cnt', title: '数量', value: 2 },
      ],
    ]);
  });
});
