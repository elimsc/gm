'use strict';

exports.cluster = {
  listen: {
    port: 7080,
    hostname: '0.0.0.0',
    // path: '/var/run/egg.sock',
  },
};

exports.mysql = {
  // 单数据库信息配置
  client: {
    // host
    host: '172.21.0.4',
    // 端口号
    port: '3306',
    // 用户名
    user: 'gm_root',
    // 密码
    password: 'ifgame_gm',
    // 数据库名
    database: 'db_gm',
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};
