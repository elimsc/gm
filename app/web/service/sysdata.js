import { post } from "../utils/request";

export async function propList(name) {
  return post('/api/sysdata/prop', { name });
}
