'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_151376544123219_5858';

  // add your config here
  config.middleware = ['auth', 'role'];

  config.auth = {
    key: '123456',
  };

  config.view = {
    mapping: {
      '.html': 'nunjucks',
    },
  };

  config.assets = {
    publicPath: '/public/',
    devServer: {
      debug: true,
      command: 'umi dev',
      port: 8000,
      env: {
        APP_ROOT: process.cwd() + '/app/web',
        BROWSER: 'none',
        ESLINT: 'none',
        SOCKET_SERVER: 'http://127.0.0.1:8000',
        PUBLIC_PATH: 'http://127.0.0.1:8000',
      },
    },
  };

  config.security = {
    csrf: false,
  };

  config.chat_log_path = "/Users/zh/Desktop"
  config.snapshotimport_script = "/Users/zh/Desktop/1.sh"

  config.mysql = {
    // 多数据库信息配置
    clients: {
      gm: {
        // host
        host: 'localhost',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: '',
        // 数据库名
        database: 'gm_projecta',
        bigNumberStrings: true,
        supportBigNumbers: true,
      },
      db_sdk_common: {
        // host
        host: 'localhost',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: '',
        // 数据库名
        database: 'gm_projecta',
        bigNumberStrings: true,
        supportBigNumbers: true,
      }
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  return config;
};
