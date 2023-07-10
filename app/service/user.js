'use strict';

const DBGMService = require('./dbgm');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * GM管理
 */
class UserService extends DBGMService {

  // GM列表
  async list({ pageSize, page, username }) {
    const condition = {};
    if (username) {
      condition.username = username;
    }
    const users = await this.db.select('user', {
      where: condition,
      columns: ['id', 'username', 'role'],
      orders: [['id', 'desc']],
      limit: pageSize,
      offset: pageSize * (page - 1),
    });
    return users;
  }

  // 获取可选角色列表
  async roleList() {
    const roles = await this.db.select('role', {
      columns: ['id', 'role_name'],
    });
    return roles;
  }

  // 获取用户对应角色channel_id
  async channelIdByRole(role) {
    const item = await this.db.get('role', { id: role });
    if (item) {
      return item.channel_id;
    }
    return -1;
  }

  // 获取角色对应的menu_sid列表
  async menuSids(role_id) {
    if (role_id == 10000) {
      const menus = await this.db.select('menu', {
        columns: ['menu_sid']
      });
      return menus.map(item => item.menu_sid);
    }
    console.log(role_id);
    const role = await this.db.get('role', { id: role_id });
    if (!role) {
      return [];
    }
    const menu_ids = role.menu_ids.split(',').map(v => parseInt(v));
    const menus = await this.db.select('menu', {
      where: { id: menu_ids },
      columns: ['menu_sid']
    });
    const menu_sids = menus.map(item => item.menu_sid);
    return menu_sids;
  }

  // 指定条件下的用户数量
  async count({ username }) {
    const condition = {};
    if (username) {
      condition.username = username;
    }
    const users_count = await this.db.count('user', condition);
    return users_count;
  }

  async findByUsername(username) {
    const user = await this.db.get('user', { username });
    return user;
  }

  // 添加GM
  async create({ username, password, role }) {
    const hashed_pass = bcrypt.hashSync(password, 10);
    try {
      const result = await this.db.insert('user', { username, password: hashed_pass, role });
      return result.affectedRows === 1;
    } catch (e) {
      // this.logger.error(e);
      return false;
    }
  }

  // 删除用户
  async delete(id) {
    try {
      const result = await this.db.delete('user', { id });
      return result.affectedRows === 1;
    } catch (e) {
      // this.logger.error(e);
      return false;
    }
  }

  // 更新用户信息
  async update(value) {
    // 去掉不必要的内容: req_url
    delete value.req_url;

    let password;
    if (value.password) {
      const hashed_pass = bcrypt.hashSync(value.password, 10);
      password = hashed_pass;
      value.password = password;
    }

    let result;
    try {
      result = await this.db.update('user', value);
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
        this.logger.error(e);
        return false;
      }
    } else {
      return false;
    }
  }

}


module.exports = UserService;
