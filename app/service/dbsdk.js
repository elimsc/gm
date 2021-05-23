'use strict';

const Service = require('egg').Service;

class DBSdkCommonService extends Service {
  constructor(props) {
    super(props);
    this.db = this.app.mysql.get('db_sdk_common');
  }
}

module.exports = DBSdkCommonService;