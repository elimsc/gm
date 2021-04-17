import { post, get } from "../utils/request";
import md5 from 'blueimp-md5';
import { MD5_KEY } from '../utils/common';

// 新增管理员用户
export async function create({ username, password, part_id, role }) {
  return post('/api/user', { username, password: md5(password, MD5_KEY), part_id, role });
}

// 管理员用户列表
export async function list(params = {}) {
  let page = 1;
  if (params.page) {
    page = params.page;
  }
  let url = `/api/user/list?page=${page}`;

  if (params.pageSize) {
    url += `&pageSize=${params.pageSize}`;
  }
  if (params.username) {
    url += `&username=${params.username}`;
  }
  return get(url);
}

// 编辑管理员, 通用
export async function update({ id, role, password }) {
  let new_pass = password;
  if (password) {
    new_pass = md5(password, MD5_KEY);
  }
  return post('/api/user/update', { id: parseInt(id), role: parseInt(role), password: new_pass });
}

// 修改当前登陆管理员密码
export async function changePass({ password }) {
  return post('/api/user/change-pass', { password: md5(password, MD5_KEY) });
}

// 通过id删除管理员
export async function deleteById(id) {
  return post(`/api/user/delete`, { id });
}

// 操作记录列表
export async function actLogList(params = {}) {
  let page = 1;
  if (params.page) {
    page = params.page;
  }
  let url = `/api/user/actlog/list?page=${page}`;

  if (params.pageSize) {
    url += `&pageSize=${params.pageSize}`;
  }
  if (params.subject) {
    url += `&subject=${params.subject}`;
  }
  return get(url);
}

// 当前登陆管理员操作记录
export async function curActlogList(params = {}) {
  let page = 1;
  if (params.page) {
    page = params.page;
  }
  let url = `/api/user/actlog/current?page=${page}`;

  if (params.pageSize) {
    url += `&pageSize=${params.pageSize}`;
  }
  return get(url);
}

export async function roleList() {
  return get(`/api/user/rolelist`);
}

export async function menuSids() {
  return get(`/api/user/menu_sids`);
}
