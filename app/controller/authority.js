'use strict';
/**
 * GM管理
 */

const BaseController = require('./base');

class AuthorityController extends BaseController {

  constructor(props) {
    super(props);
    this.authorityService = this.ctx.service.authority;
  }

  // GET /api/authority/menu/list
  async menuList() {
    const menues = await this.authorityService.menuList();
    this.ctx.body = this.success(menues);
  }

  // POST /api/authority/menu/create
  async createMenu() {
    const { menu_name, menu_sid, urls } = this.ctx.request.body;
    const r = await this.authorityService.createMenu({ menu_name, menu_sid, urls });
    this.ctx.body = this.successOrFailed(r);
  }

  // POST /api/authority/menu/update
  async updateMenu() {
    const { menu_name, menu_sid, urls, id } = this.ctx.request.body;
    const r = await this.authorityService.updateMenu({ menu_name, menu_sid, urls, id });
    this.ctx.body = this.successOrFailed(r);
  }

  // POST /api/authority/menu/delete
  async deleteMenu() {
    const { id } = this.ctx.request.body;
    const r = await this.authorityService.deleteMenu(id);
    this.ctx.body = this.successOrFailed(r);
  }

  // GET /api/authority/menu/tree
  async menuTree() {
    const tree = await this.authorityService.menuTree();
    this.ctx.body = this.success(tree);
  }

  // GET /api/authority/role/list
  async roleList() {
    const roles = await this.authorityService.roleList();
    this.ctx.body = this.success(roles);
  }

  // GET /api/authority/role/one
  async oneRole() {
    const { id } = this.ctx.query;
    const role = await this.authorityService.oneRole(id);
    this.ctx.body = this.success(role);
  }

  // POST /api/authority/role/create
  async createRole() {
    const { role_name, channel_id, menu_ids } = this.ctx.request.body;
    const r = await this.authorityService.createRole({ role_name, channel_id, menu_ids });
    this.ctx.body = this.successOrFailed(r);
  }

  // POST /api/authority/role/update
  async updateRole() {
    const { role_name, channel_id, menu_ids, id } = this.ctx.request.body;
    const r = await this.authorityService.updateRole({ role_name, channel_id, menu_ids, id });
    this.ctx.body = this.successOrFailed(r);
  }

  // POST /api/authority/role/delete
  async deleteRole() {
    const { id } = this.ctx.request.body;
    const r = await this.authorityService.deleteRole(id);
    this.ctx.body = this.successOrFailed(r);
  }


}

module.exports = AuthorityController;
