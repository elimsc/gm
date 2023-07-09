import { post } from "../utils/request";

// 封号
// type 0封号 1解封
export async function banAccount({ guid, type, start, end, reason, uid, part_id, ban_type }) {
  if (type === 0) {
    return post(`/api/player/ban/account`, { type: ban_type, start, end, reason, uid, part_id, guid });
  } else {
    return post(`/api/player/ban/account-r`, { type: ban_type, reason, uid, part_id, guid });
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
// export async function banLog({ guid, part_id }) {
//   return post(`/api/player/ban/log`, { guid, part_id });
// }


export async function blackListInfo({uid}) {
  return post(`/api/player/ban/black-list-info`, {uid})
}

export async function setBlackList({uid, type, time, reason}) {
  return post(`/api/player/ban/set-black-list`, {uid, type, time, reason})
}