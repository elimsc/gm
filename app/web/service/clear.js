import { post } from "../utils/request";

export async function clearSecureCode({ guid, part_id }) {
  return post(`/api/player/clear/secure-code`, { guid, part_id });
}

export async function clearUnGang({ guid, part_id }) {
  return post(`/api/player/clear/un-gang`, { guid, part_id });
}

export async function clearUnTask({ guid, part_id }) {
  return post(`/api/player/clear/un-task`, { guid, part_id });
}
