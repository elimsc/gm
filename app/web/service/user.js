import { post, get } from "../utils/request";

// 新增管理员用户
export async function create(user) {
  return post('/api/user', user);
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
export async function changeRole({id, role}) {
  return post('/api/user/update', {id: parseInt(id), role: parseInt(role)});
}

