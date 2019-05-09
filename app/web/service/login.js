import { post } from "../utils/request";
import md5 from 'blueimp-md5';

const MD5_KEY = "my_md5";

// 登陆
export async function login({ username, password }) {
  return post('/api/login', { username, password: md5(password, MD5_KEY) });
}

// 验证当前用户是否已登陆
export async function check() {
  return post('/api/login/check');
}

// 登出（注销）
export async function logout() {
  return post('/api/logout');
}
