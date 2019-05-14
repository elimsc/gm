import { list } from '../service/srv';

export default {
  namespace: 'global',
  state: {
    srvList: [], // 区服列表
    part_id: -1, // 选中区服
    user_role: 1,
    req_url: '', // 服务器ip
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
