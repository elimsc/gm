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
  return post(`/api/player/gmact/player-level`, { part_id, level, guid });
}

// 设置宠物等级
export async function setPetLevel({ part_id, level, guid, pet_guid }) {
  return post(`/api/player/gmact/pet-level`, { part_id, level, guid, pet_guid });
}

// 设置宠物修炼等级
export async function setPetPraclevel({ part_id, level, guid, pet_guid, type }) {
  return post(`/api/player/gmact/pet-praclevel`, { part_id, level, guid, pet_guid, type });
}

// 设置宠物炼符等级
export async function setPetLflevel({ part_id, level, guid, pet_guid, type }) {
  return post(`/api/player/gmact/pet-lflevel`, { part_id, level, guid, pet_guid, type });
}

// 设置英雄数据
export async function setHeroData({part_id, guid, hero_id, type, sub_type, value_type, new_value}) {
  return post(`/api/player/gmact/change-hero-data`, {part_id, guid, hero_id, type, sub_type: parseInt(sub_type), value_type: parseInt(value_type), new_value: parseInt(new_value)});
}

// 修改玩家数据
export async function changePlayerData({part_id, guid, type, new_value}) {
  return post(`/api/player/gmact/change-player-data`, {part_id, guid, type, new_value: parseInt(new_value)});
}

/**
 * type: 1--添加 2--删除
 */
export async function titlem({ type, title, part_id, guid }) {
  if (type === 1) {
    return post(`/api/player/gmact/add-title`, {
      title_id: title,
      part_id,
      guid,
    });
  } else {
    return post(`/api/player/gmact/del-title`, {
      title_id: title,
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

export async function changePass({ value, part_id, uid }) {
  return post(`/api/player/gmact/change-pass`, {
    value,
    part_id,
    uid,
  });
}

export async function untiePhone({ part_id, uid }) {
  return post(`/api/player/gmact/untie-phone`, {
    part_id,
    uid,
  });
}

export async function untieR2({ part_id, uid }) {
  return post(`/api/player/gmact/untie-r2`, {
    part_id,
    uid,
  });
}

/**
 * 直接发放奖励
 */
export async function awardD({ guid, type, id, cnt, param, part_id }) {
  return post(`/api/player/gmact/award-d`, {
    part_id,
    guid,
    type,
    id,
    cnt,
    param,
  });
}

/**
 * 充值补发
 */
export async function reIssue({ guid, part_id, pay_type, cp_order_id, recharge_id }) {
  return post(`/api/player/gmact/reissue`, { guid, part_id, pay_type, cp_order_id, recharge_id });
}

/**
 * 删除邮件
 */
export async function delMail({ guid, part_id, mail_id_list }) {
  return post(`/api/player/gmact/del-mail`, { guid, part_id, mail_id_list });
}

