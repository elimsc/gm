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

