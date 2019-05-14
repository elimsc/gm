import { post } from "../utils/request";

export async function list({ type, name, part_id }) {
  console.log({ type, name, part_id })
  return post(`/api/player/list`, {
    type,
    name,
    part_id,
  })
}


/**
 * @param {string} type 信息类型：basic-info, bag-info, ...
 * @param {object} value 请求体
 */
export async function fetchInfo(type, { guid, uid, part_id }) {
  if (type === 'ban-account-info') {
    return post(`/api/player/playerinfo/${type}`, { uid, part_id });
  } else {
    return post(`/api/player/playerinfo/${type}`, { guid, part_id });
  }
}

