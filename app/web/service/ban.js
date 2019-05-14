import { post } from "../utils/request";

// 封号
// type 0封号 1解封
export async function banAccount({ type, start, end, reason, uid, part_id }) {
  if (type === 0) {
    return post(`/api/player/ban/account`, { start, end, reason, uid, part_id });
  } else {
    return post(`/api/player/ban/account-r`, { reason, uid, part_id });
  }
}

// 禁言
// type 0禁言 1解禁
export async function banTalk({ type, start, end, reason, guid, part_id }) {
  if (type === 0) {
    return post(`/api/player/ban/talk`, { start, end, reason, guid, part_id });
  } else {
    return post(`/api/player/ban/talk-r`, { reason, guid, part_id });
  }
}

// 封号记录
export async function banLog({ guid, part_id }) {
  return post(`/api/player/ban/log`, { guid, part_id });
}
