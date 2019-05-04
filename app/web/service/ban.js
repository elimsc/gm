import { post } from "../utils/request";

// 封号
export async function banAccount({ start, end, reason, guid, part_id }) {
  return post(`/api/player/ban/account`, { start, end, reason, guid, part_id });
}

// 禁言
export async function banTalk({ reason, minutes, guid, part_id }) {
  return post(`/api/player/ban/talk`, { reason, minutes, guid, part_id });
}

// 封号记录
export async function banLog({ guid, part_id }) {
  return post(`/api/player/ban/log`, { guid, part_id });
}
