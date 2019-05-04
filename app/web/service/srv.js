import { get } from "../utils/request";

export async function list() {
  return get('/api/srv/list');
}