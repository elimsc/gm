import { post } from "../utils/request";

export async function list({ type, name }) {
  return post(`/api/player/list`, {
    type,
    name
  })
}


/**
 * @param {string} type 信息类型：basic-info, bag-info, ...
 * @param {object} value 请求体
 */
export async function fetchInfo(type, value) {
  return post(`/api/player/${type}`, value);
}

