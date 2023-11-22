import { post } from "../utils/request";

// 帮会列表
export async function list({ part_id }) {
  return post('/api/gang/list', { part_id });
}

// 帮会信息
export async function info({ part_id, gang_guid }) {
  return post('/api/gang/info', { part_id, gang_guid });
}

// 封号
export async function ban({ part_id, uid, guid }) {
  return post('/api/gang/ban', { part_id, uid, guid });
}

// 修改公告
export async function notice({gang_id, gang_guid, notice }) {
  return post('/api/gang/notice', { gang_id, gang_guid, notice });
}

// 解散帮会
export async function dismiss({ gang_id, gang_guid }) {
  return post('/api/gang/dismiss', { gang_id, gang_guid });
}

// GM指令
export async function gmIns({ gang_id, gang_guid, command, string_param, int_param }) {
  return post('/api/gang/gmins', { gang_id, gang_guid, command, string_param, int_param });
}