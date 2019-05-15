import { post } from "../utils/request";

// 批量操作
export async function batchAct({ type, reason, guid, part_id }) {
  return post('/api/batchact', { type, reason, guid, part_id });
}

// 批量发放道具
export async function batchAward({ awards, reason }) {
  return post('/api/batchact/award', { awards, reason });
}
