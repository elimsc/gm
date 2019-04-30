import { post } from "../utils/request";

export async function clearSecureCode({ guid }) {
  return post(`/api/player/clear/secure-code`, { guid });
}

export async function clearUnGang({ guid }) {
  return post(`/api/player/clear/un-gang`, { guid });
}

export async function clearUnTask({ guid }) {
  return post(`/api/player/clear/un-task`, { guid });
}
