import * as services from '../services';


const initTable = {
  rows: [],
  pageNumber: 0,
  total: 0,
  pageSize: 20,
};

export default {
  namespace: 'leaveBillModel',

  state: {

    mainData: {
      ...initTable,
    },

  },


  reducers: {

    updateState(state, { res }) { //更新state
      return {
        ...state,
        ...res,
      };
    },
  },


  effects: {

    //  获取主表数据
    * getMainData({ payload, callback }, { call, put, select }) {
      const { data } = yield call(services.getLeaveBill, payload);
      let mainData = initTable;
      if (data) {
        mainData = data;
        yield put({ type: 'updateState', res: { mainData } });
      }
      if (callback) {
        callback(data);
      }
    },


    // 添加
    * addData({payload, callback}, {call, put, select}) {
      const data = yield call(services.addLeaveBill, payload);
      if (callback) {
        callback(data);
      }
    },




  },


};

