import { post, get } from "../utils/request";



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

// 角色快照导入
export async function snapshotImport({ from_part_ids, from_guids, to_guids, keys, to_part_id }) {
  return post('/api/sysact/snapshotimport', { from_part_ids, from_guids, to_guids, keys, to_part_id });
}

export async function addIpBlackList({rows}) {
  return post('/api/sysact/add_ip_black_list', {rows})
}

export async function listIpBlackList() {
  return get('/api/sysact/ip_black_list')
}

export async function delIpBlackList({id}) {
  return post('/api/sysact/del_ip_black_list', {id})
}


