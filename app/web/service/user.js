import { post, get } from "../utils/request";
import md5 from 'blueimp-md5';

const MD5_KEY = "my_md5";

// 新增管理员用户
export async function create({ username, password, part_id }) {
  return post('/api/user', { username, password: md5(password, MD5_KEY), part_id });
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

// 修改管理员权限
export async function changeRole({ id, role }) {
  return post('/api/user/update', { id: parseInt(id), role: parseInt(role) });
}

// 修改当前登陆管理员密码
export async function changePass({ password }) {
  return post('/api/user/change-pass', { password: md5(password, MD5_KEY) });
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

