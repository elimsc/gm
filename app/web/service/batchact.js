import { post } from "../utils/request";

// 批量操作
export async function batchAct({type, reason, guid, part_id}) {
  return post('/api/batchact', {type, reason, guid, part_id});
}