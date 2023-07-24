import { list } from '../service/srv';
import { menuSids } from '../service/user';

export default {
  namespace: 'global',
  state: {
    srvList: [], // 区服列表
    part_id: -1, // 选中区服
    user_role: 1,
    req_url: '', // 服务器ip
    menu_sids: [],
  },
  effects: {
    *fetchSrvList({ payload }, { put, call }) {
      const data = yield call(list, { ...payload });
      const srvList = data.payload;
      yield put({
        type: 'save',
        payload: {
          srvList
        }
      })
    },
    *fetchMenuSids({ payload }, { put, call }) {
      const data = yield call(menuSids, { ...payload });
      const menu_sids = data.payload;
      yield put({
        type: 'save',
        payload: {
          menu_sids
        }
      })
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
};
