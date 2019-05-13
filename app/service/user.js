'use strict';

const Service = require('egg').Service;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * GM管理
 */
class UserService extends Service {

  // GM列表
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

  // 添加GM
  async create({ username, password }) {
    const hashed_pass = bcrypt.hashSync(password, 10);
    try {
      const result = await this.app.mysql.insert('user', { username, password: hashed_pass });
      return result.affectedRows === 1;
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }

  // 删除用户
  async delete(username) {
    try {
      const result = await this.app.mysql.delete('user', { username });
      return result.affectedRows === 1;
    } catch (e) {
      this.logger.error(e);
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
      this.logger.error(e);
      return false;
    }
  }

  // GM登陆
  async login({ username, password }, pass_compare = true) {
    // 查数据库，判断密码是否正确
    const user = await this.findByUsername(username);
    if (user && user.password && (!pass_compare || bcrypt.compareSync(password, user.password))) {
      try {
        // 生成token
        const token = jwt.sign({ username }, this.app.config.auth.key, { expiresIn: '7d' });
        const token_write_su = this.update({ id: user.id, token }); // 更新token
        if (token_write_su) {
          return { token };
        }
        return false; // token写入失败

      } catch (e) {
        return false;
      }
    } else {
      return false;
    }
  }

}


module.exports = UserService;
