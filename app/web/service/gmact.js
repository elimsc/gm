import { post } from "../utils/request";

export async function money({ dianquan, yinliang, xianyuan, bxianyuan, part_id, guid }) {
  return post(`/api/player/gmact/money`, {
    dianquan,
    yinliang,
    xianyuan,
    bxianyuan,
    part_id,
    guid,
  });
}

/**
 * names: 道具名的数组
 * counts: 道具数量的数组
 */
export async function prop({ names, counts, part_id, guid }) {
  return post(`/api/player/gmact/prop`, {
    names,
    counts,
    part_id,
    guid,
  });
}

/**
 * type: 1-玩家经验 2-玩家等级 3-宠物经验
 */
export async function exp({ type, data, part_id, guid }) {
  return post(`/api/player/gmact/exp`, {
    type,
    data,
    part_id,
    guid,
  });
}

/**
 * type: 1--添加 2--删除
 */
export async function titlem({ type, data, part_id, guid }) {
  return post(`/api/player/gmact/titlem`, {
    type, 
    data,
    part_id,
    guid,
  });
}

export async function pracLevel({ value, part_id, guid }) {
  return post(`/api/player/gmact/prac-level`, { 
    value,
    part_id,
    guid, 
  });
}

export async function petsymbolLevel({ value, part_id, guid }) {
  return post(`/api/player/gmact/petsymbol-level`, { 
    value,
    part_id,
    guid, 
  });
}

export async function forcedown({part_id, guid}) {
  return post(`/api/player/gmact/forcedown`, {part_id, guid});
}

export async function changeSecureCode({ value, part_id, guid }) {
  return post(`/api/player/gmact/secure-code`, { 
    value,
    part_id,
    guid,
   });
}

export async function changePass({ value, part_id, guid }) {
  return post(`/api/player/gmact/change-pass`, { 
    value,
    part_id,
    guid,
   });
}

export async function untiePhone({part_id, guid}) {
  return post(`/api/player/gmact/untie-phone`, {
    part_id,
    guid,
  });
}

