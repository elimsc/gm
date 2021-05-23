'use strict';

const Service = require('egg').Service;

class DBGMService extends Service {
  constructor(props) {
    super(props);
    this.db = this.app.mysql.get('gm');
  }
}

module.exports = DBGMService;
