import { post } from "../utils/request";

export async function list({ req_url }) {
  return post('/api/srv/list', { req_url });
}
