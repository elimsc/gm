import { list } from '../service/srv';

export default {
  namespace: 'global',
  state: {
    srvList: [],
    part_id: -1,
    user_role: 1,
  },
  effects: {
    *fetchSrvList({ payload }, { put, call }) {
      const data = yield call(list);
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
