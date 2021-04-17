import { post, get } from "../utils/request";


// 新增menu
export async function createMenu({ menu_sid, menu_name, urls }) {
  return post('/api/authority/menu/create', { menu_sid, menu_name, urls });
}

// menu列表
export async function menuList() {
  return get('/api/authority/menu/list');
}

// menu tree
export async function menuTree() {
  return get('/api/authority/menu/tree');
}

// 更新menu
export async function updateMenu({ id, menu_sid, menu_name, urls }) {
  return post('/api/authority/menu/update', { id, menu_sid, menu_name, urls });
}

// 删除menu
export async function deleteMenu(id) {
  return post('/api/authority/menu/delete', { id });
}

// 新增role
export async function createRole({ role_name, channel_id, menu_ids }) {
  return post('/api/authority/role/create', { role_name, channel_id, menu_ids });
}

// 删除role
export async function deleteRole({ id }) {
  return post('/api/authority/role/delete', { id });
}

// 更新role
export async function updateRole({ id, role_name, channel_id, menu_ids }) {
  return post('/api/authority/role/update', { id, role_name, channel_id, menu_ids });
}

// role列表
export async function roleList() {
  return get('/api/authority/role/list');
}

// 单个role
export async function oneRole({ id }) {
  return get(`/api/authority/role/one?id=${id}`);
}




