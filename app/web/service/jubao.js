import { get, post } from "../utils/request";



// 举报信息列表
export async function listgroup() {
  return get('/api/jubao/listgroup');
}

// 举报信息详情 by targetGuid
export async function detailByTargetGuid(guid) {
  return get(`api/jubao/detailByGuid?guid=${guid}`);
}

// 删除举报信息 by targetGuid
export async function deleteByTargetGuid(guid) {
  return post('/api/jubao/deleteByGuid', { guid });
}

// 封号
export async function ban({ guid, part_id, uid }) {
  return post('/api/jubao/ban', { guid, part_id, uid });
}

// 禁言
export async function banTalk({ guid, part_id }) {
  return post('/api/jubao/ban-talk', { guid, part_id });
}




