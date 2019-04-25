'use strict';

const Service = require('egg').Service;
const bcrypt = require('bcrypt');

class UserService extends Service {

  // 用户列表
  async list({ pageSize, page, username }) {
    const condition = {};
    if (username) {
      condition.username = username;
    }
    const users = await this.app.mysql.select('user', {
      where: condition,
      columns: [ 'id', 'username', 'role' ],
      orders: [[ 'id', 'desc' ]],
      limit: pageSize,
      offset: pageSize * (page - 1),
    });
    return users;
  }

  // 指定条件下的用户数量
  async count({ username }) {
    const condition = {};
    if (username) {
      condition.username = username;
    }
    const users_count = await this.app.mysql.count('user', condition);
    return users_count;
  }

  async findByUsername(username) {
    const user = await this.app.mysql.get('user', { username });
    return user;
  }

  async create({ username, password }) {
    const hashed_pass = bcrypt.hashSync(password, 10);
    try {
      const result = await this.app.mysql.insert('user', { username, password: hashed_pass });
      return result.affectedRows === 1;
    } catch (e) {
      return false;
    }
  }

  // 删除用户
  async delete(username) {
    try {
      const result = await this.app.mysql.delete('user', { username });
      return result.affectedRows === 1;
    } catch (e) {
      return false;
    }
  }

  // 更新用户信息
  async update(value) {
    let password;
    if (value.password) {
      const hashed_pass = bcrypt.hashSync(value.password, 10);
      password = hashed_pass;
      value.password = password;
    }

    let result;
    try {
      result = await this.app.mysql.update('user', value);
      return result.affectedRows === 1;
    } catch (e) {
      return false;
    }
  }

}


module.exports = UserService;
