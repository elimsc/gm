'use strict';

const DBGMService = require('./dbgm');

/**
 * 权限管理
 */
class AuthorityService extends DBGMService {
  async createMenu({ menu_name, menu_sid, urls }) {
    try {
      const result = await this.db.insert('menu', { menu_name, menu_sid, urls });
      return result.affectedRows === 1;
    } catch (e) {
      return false;
    }
  }

  async deleteMenu(id) {
    try {
      const result = await this.db.delete('menu', { id });
      return result.affectedRows === 1;
    } catch (e) {
      return false;
    }
  }

  async updateMenu({ id, menu_name, menu_sid, urls }) {
    try {
      const result = await this.db.update('menu', { id, menu_name, menu_sid, urls });
      return result.affectedRows === 1;
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }

  async menuList() {
    const condition = {};
    const menus = await this.db.select('menu', {
      where: condition,
      columns: ['id', 'menu_name', 'menu_sid', 'urls'],
      orders: [['id', 'desc']],
    });
    return menus;
  }

  async menuTree() {
    const condition = {};
    let menus = await this.db.select('menu', {
      where: condition,
      columns: ['id', 'menu_sid', 'menu_name'],
      orders: [['menu_sid', 'asc']],
    });
    menus = menus.map(item => ({ key: item.id, title: item.menu_name, sid: item.menu_sid }));
    return buildTree(menus);
  }

  async createRole({ role_name, channel_id, menu_ids }) {
    try {
      const result = await this.db.insert('role', { role_name, channel_id, menu_ids });
      return result.affectedRows === 1;
    } catch (e) {
      return false;
    }
  }

  async deleteRole(id) {
    try {
      const result = await this.db.delete('role', { id });
      return result.affectedRows === 1;
    } catch (e) {
      return false;
    }
  }

  async updateRole({ id, role_name, channel_id, menu_ids }) {
    try {
      const result = await this.db.update('role', { id, role_name, channel_id, menu_ids });
      return result.affectedRows === 1;
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }

  async roleList() {
    const condition = {};
    const roles = await this.db.select('role', {
      where: condition,
      columns: ['id', 'role_name', 'channel_id'],
      orders: [['id', 'desc']],
    });
    return roles;
  }

  async oneRole(id) {
    const role = await this.db.get('role', { id });
    return role;
  }

  // 根据role_id判断role是否有权访问某url
  async hasPermission(role_id, url) {
    const role = await this.db.get('role', { id: role_id });
    const menu_ids = role.menu_ids.split(',').map(v => parseInt(v));
    const menus = await this.db.select('menu', {
      where: { id: menu_ids },
      columns: ['urls']
    });
    const urls2d = menus.map(item => item.urls).filter(item => !!item);
    let urls = [];
    for (let i = 0; i < urls2d.length; i++) {
      urls = urls.concat(urls2d[i].split('\n'));
    }
    return urls.includes(url);
  }
}


function buildTree(nodes) {
  function getParent(str) {
    const splitedStr = str.split('-');
    if (splitedStr.length > 1) {
      return splitedStr.filter((item, i) => i != splitedStr.length - 1).reduce((a, b) => a + '-' + b)
    }
    return false
  }

  const treeNodes = {}
  for (let i = 0; i < nodes.length; i++) {
    treeNodes[nodes[i].sid] = nodes[i]
  }
  const root = { children: [] }
  for (let i = 0; i < nodes.length; i++) {
    const parentTitle = getParent(nodes[i].sid)
    if (parentTitle === false) {
      root.children.push(treeNodes[nodes[i].sid]);
      continue;
    }
    const parentTreeNode = treeNodes[parentTitle]
    if (!parentTreeNode.children) parentTreeNode.children = [treeNodes[nodes[i].sid]]
    else parentTreeNode.children.push(treeNodes[nodes[i].sid])
  }

  return root.children;
}


module.exports = AuthorityService;
