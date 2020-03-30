import { post } from "../utils/request";



// 系统操作--GM指令
export async function gmIns(data) {
  return post('/api/sysact/gmins', data);
}

// 查询现在支付黑白名单
export async function listPayBlacklist({ part_id, mode }) {
  return post('/api/sysact/listpayblacklist', { part_id, mode });
}

export async function updatePayBlacklist({ part_id, mode, add_list, del_list }) {
  return post('/api/sysact/updatepayblacklist', { part_id, mode, add_list, del_list });
}


