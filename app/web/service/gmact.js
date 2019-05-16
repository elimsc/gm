import { post } from "../utils/request";

/**
 * 发放货币
 * names 货币类型的数组
 * counts 对应的值
 */
export async function money({ names, counts, part_id, guid, reason }) {
  return post(`/api/player/gmact/money`, {
    names,
    counts,
    part_id,
    guid,
    reason,
  });
}

/**
 * names: 道具名的数组
 * counts: 道具数量的数组
 */
export async function prop({ names, counts, part_id, guid, params, reason }) {
  return post(`/api/player/gmact/prop`, {
    names,
    counts,
    part_id,
    guid,
    params,
    reason,
  });
}

/**
 * 玩家经验
 */
export async function exp({ jingyan, part_id, guid, reason }) {
  return post(`/api/player/gmact/exp`, {
    jingyan,
    part_id,
    guid,
    reason
  });
}

/**
 * 设置玩家等级
 */
export async function setPlayerLevel({ part_id, level, guid }) {
  return post(`/api/player/gmact/set-player-level`, { part_id, level, guid });
}

/**
 * 设置宠物等级
 */
export async function setPetLevel({ part_id, level, guid, pet_guid }) {
  return post(`/api/player/gmact/set-pet-level`, { part_id, level, guid, pet_guid });
}

/**
 * type: 1--添加 2--删除
 */
export async function titlem({ type, title, part_id, guid }) {
  if (type === 1) {
    return post(`/api/player/gmact/add-title`, {
      title,
      part_id,
      guid,
    });
  } else {
    return post(`/api/player/gmact/del-title`, {
      title,
      part_id,
      guid,
    });
  }
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

export async function forcedown({ part_id, guid }) {
  return post(`/api/player/gmact/forcedown`, { part_id, guid });
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

export async function untiePhone({ part_id, guid }) {
  return post(`/api/player/gmact/untie-phone`, {
    part_id,
    guid,
  });
}

