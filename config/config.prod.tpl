'use strict';

exports.cluster = {
  listen: {
    port: 7080,
    hostname: '0.0.0.0',
    // path: '/var/run/egg.sock',
  },
};

exports.mysql = {
  // 数据库信息配置
  clients: {
    gm: {
        // host
        host: '',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: '',
        // 数据库名
        database: 'db_gm',
        bigNumberStrings: true,
        supportBigNumbers: true,
    },
    db_sdk_common: { // 存储举报信息
        host: '',
        port: '3306',
        user: 'root',
        password: '',
        database: 'db_gm',
        bigNumberStrings: true,
        supportBigNumbers: true,
    }
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};

exports.chat_log_path = '/usr/local/ifgame/iaf/remote_app_log/gn/merge';
exports.snapshotimport_script='null'