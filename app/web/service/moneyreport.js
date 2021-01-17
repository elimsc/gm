import { post } from "../utils/request";

// 获取金额列表
export async function getMoneyList({ part_id }) {
  return post('/api/moneyreport/report', { part_id, mode: 0, moneylist: [], uid_list: [] });
}

// 添加金额列表
export async function addMoneyList({ part_id, list }) {
  return post('/api/moneyreport/report', { part_id, mode: 2, moneylist: list, uid_list: [] });
}

// 删除金额列表
export async function delMoneyList({ part_id, list }) {
  return post('/api/moneyreport/report', { part_id, mode: 3, moneylist: list, uid_list: [] });
}

// 获取uid列表
export async function getUidList({ part_id }) {
  return post('/api/moneyreport/report', { part_id, mode: 1, moneylist: [], uid_list: [] });
}

// 添加uid列表
export async function addUidList({ part_id, list }) {
  return post('/api/moneyreport/report', { part_id, mode: 4, uid_list: list, moneylist: [] });
}

// 删除uid列表
export async function delUidList({ part_id, list }) {
  return post('/api/moneyreport/report', { part_id, mode: 5, uid_list: list, moneylist: [] });
}



