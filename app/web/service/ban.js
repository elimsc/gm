import { post } from "../utils/request";

export async function banAccount({ start, end, reason, guid }) {
  return post(`/api/player/ban/account`, { start, end, reason, guid });
}

export async function banTalk({ reason, minutes, guid }) {
  return post(`/api/player/ban/talk`, { reason, minutes, guid });
}

export async function banLog({ guid }) {
  return post(`/api/player/ban/log`, { guid });
}
