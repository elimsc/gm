import { post } from "../utils/request";

// 封号
export async function addBroadcast(data) {
  return post(`/api/broadcast/add`, data);
}

