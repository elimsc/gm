import { post } from "../utils/request";


// 批量发放道具
export async function batchAward({ awards, reason, part_id }) {
  return post('/api/batchact/award', { awards, reason, part_id });
}

export async function batchBanAccount({ items, reason, part_id }) {
  return post(`/api/batchact/ban-account`, { items, reason, part_id });
}

export async function batchBanTalk({ items, reason, part_id }) {
  return post(`/api/batchact/ban-talk`, { items, reason, part_id });
}
