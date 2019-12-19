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
export async function ban({ part_id, uid }) {
  return post('/api/gang/ban', { part_id, uid });
}

// 修改公告
export async function notice({ part_id, gang_guid, notice }) {
  console.log({ part_id, gang_guid, notice });
  return post('/api/gang/notice', { part_id, gang_guid, notice });
}

// 解散帮会
export async function dismiss({ part_id, gang_guid }) {
  console.log({ part_id, gang_guid });
  return post('/api/gang/dismiss', { part_id, gang_guid });
}

// GM指令
export async function gmIns({ part_id, gang_guid, gang_cmd, params }) {
  console.log({ part_id, gang_guid, gang_cmd, params });
  return post('/api/gang/gmins', { part_id, gang_guid, gang_cmd, params });
}