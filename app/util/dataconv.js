'use strict';

/**
 * {
 *  name: 'name1',
 *  cnt: 2,
 * }
 * 在参数
 * {
 *  name: '名字',
 *  cnt: '数量'
 * }
 * 转化为
 * [
 * {key: 'name', title: '姓名', value: 'name1'},
 * {key: 'cnt', title: '数量'， value: 2}
 * ]
 * @param src 数据源
 * @param tpl 转化模板
 */
const tableInfoConv = (src, tpl) => {
  return Object.keys(src).map(k => {
    return { key: k, title: tpl[k], value: src[k] };
  });
};

const tableInfoListConv = (src, tpl) => {
  return src.map(data => {
    return tableInfoConv(data, tpl);
  });
};

module.exports = { tableInfoConv, tableInfoListConv };

