import { post } from "../utils/request";

export async function money({ dianquan, yinliang, xianyuan, bxianyuan }) {
  return post(`/api/player/gmact/money`, {
    dianquan,
    yinliang,
    xianyuan,
    bxianyuan
  });
}

/**
 * names: 道具名的数组
 * counts: 道具数量的数组
 */
export async function prop({ names, counts }) {
  return post(`/api/player/gmact/prop`, {
    names,
    counts
  });
}

/**
 * type: 1-玩家经验 2-玩家等级 3-宠物经验
 */
export async function exp({ type, data }) {
  return post(`/api/player/gmact/exp`, {
    type,
    data
  });
}

/**
 * type: 1--添加 2--删除
 */
export async function titlem({ type, data }) {
  return post(`/api/player/gmact/titlem`, {
    type, data
  });
}

export async function pracLevel({ value }) {
  return post(`/api/player/gmact/prac-level`, { value });
}

export async function petsymbolLevel({ value }) {
  return post(`/api/player/gmact/petsymbol-level`, { value });
}

export async function forcedown() {
  return post(`/api/player/gmact/forcedown`);
}

export async function changeSecureCode({ value }) {
  return post(`/api/player/gmact/secure-code`, { value });
}

export async function changePass({ value }) {
  return post(`/api/player/gmact/change-pass`, { value });
}

export async function untiePhone() {
  return post(`/api/player/gmact/untie-phone`);
}

