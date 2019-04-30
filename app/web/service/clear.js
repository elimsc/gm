import { post } from "../utils/request";

export async function clearSecureCode() {
  return post(`/api/player/clear/secure-code`);
}

export async function clearUnGang() {
  return post(`/api/player/clear/un-gang`);
}

export async function clearUnTask() {
  return post(`/api/player/clear/un-task`);
}