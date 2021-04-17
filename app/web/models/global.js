import { list } from '../service/srv';
import { menuSids } from '../service/user';

const menu_sids = [
  '1',
  '1-1', '1-1-1', '1-1-2', '1-1-3', '1-1-4', '1-1-5', '1-1-6', '1-1-7', '1-1-8', '1-1-9',
  '1-2', '1-1-10', '1-1-11', '1-1-12',
  '1-2-1', '1-2-2', '1-2-3', '1-2-4', '1-2-5', '1-2-6', '1-2-7', '1-2-8', '1-2-9', '1-2-10',
  '1-3', '1-3-1', '1-3-2',
  '1-4', '1-4-1', '1-4-2', '1-4-3', '1-4-4',
  '1-5',
  '2',
  '3', '3-1', '3-2',
  '4', '4-1', '4-2', '4-3',
  '5',
  '6', '6-1', '6-2', '6-3', '6-4',
  '7', '7-1', '7-2', '7-3',
  '8', '8-1', '8-2', '8-4', '8-3',
];


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
