import { post } from "../utils/request";

// 登陆
export async function login({ username, password }) {
  return post('/api/login', { username, password });
}

// 验证当前用户是否已登陆
export async function check() {
  return post('/api/login/check');
}

// 登出（注销）
export async function logout() {
  return post('/api/logout');
}
