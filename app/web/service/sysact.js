import { post } from "../utils/request";

// 系统操作--服务与活动管理
export async function activityMan(data) {
  return post('/api/sysact/activity', data);
}

// 系统操作--GM指令
export async function gmIns(data) {
  return post('/api/sysact/gmins', data);
}

// 系统操作--服务器强制下线
export async function srvForcedown(data) {
  return post('/api/sysact/srvforcedown', data);
}