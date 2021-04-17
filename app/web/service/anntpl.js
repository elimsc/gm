import { post, get } from "../utils/request";

// 删除词条
export async function delTpl(id) {
  return post(`/api/broadcast/tpl/delete`, { id });
}

// 创建词条
export async function create({ anntpl }) {
  return post(`/api/broadcast/tpl/add`, { content: anntpl });
}

// 词条列表
export async function listTpl() {
  return get('/api/broadcast/tpl/list');
}
